import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Station, StationDocument } from '../schemas/station.schema';
import { Model } from 'mongoose';
import { StationRequestDto } from '../dtos/station_entries.dto';
import { StationPrixOnly } from '../schemas/station-prix-only.schema';
import { PositionDto } from '../dtos/position.dto';
import { DistanceDto } from '../dtos/distance.dto';
import { FuelPriceDto } from '../dtos/fuel-price.dto';

@Injectable()
export class StationService {
  constructor(
    @InjectModel(Station.name) private stationModel: Model<StationDocument>,
    @InjectModel(StationPrixOnly.name) private prixModel: Model<StationDocument>,
  ) {}

  getAll(): Promise<Station[]> {
    return this.stationModel.find().exec();
  }

  getAllFromCp(cp: string): Promise<Station[]> {
    return this.stationModel.find({ _cp: cp }).exec();
  }

  getWithFilter(filter: StationRequestDto) {
    let match: any = {};
    const prixMatch: any = {};
    if (filter?.fuel) prixMatch['_nom'] = { $in: filter.fuel };
    if (filter?.postalCode) match['_cp'] = { $regex: filter.postalCode, $options: 'i' };
    if (filter?.priceMin || filter?.priceMax) {
      if (filter.priceMin && filter.priceMax) prixMatch['_valeur'] = { $gte: filter.priceMin, $lte: filter.priceMax };
      else if (filter.priceMin) prixMatch['_valeur'] = { $gte: filter.priceMin };
      else prixMatch['_valeur'] = { $lte: filter.priceMax };
    }
    match['prix'] = { $elemMatch: prixMatch };
    match = {
      ...match,
      ...filter?.innerRequest,
      ...StationService.fromPositionRequestToMatchRequest(filter?.distance),
    };
    return this.stationModel
      .aggregate([
        {
          $match: match,
        },
      ])
      .exec();
  }

  retrieveFuels() {
    return this.stationModel.distinct('prix._nom');
  }

  getPrixWithFilter(filter: StationRequestDto): Promise<StationPrixOnly[]> {
    let match: any = {};
    const prixMatch: any = {};
    if (filter?.fuel) prixMatch['_nom'] = { $in: filter.fuel };
    if (filter?.postalCode) match['_cp'] = { $regex: filter.postalCode, $options: 'i' };
    if (filter?.priceMin || filter?.priceMax) {
      if (filter.priceMin && filter.priceMax) prixMatch['_valeur'] = { $gte: filter.priceMin, $lte: filter.priceMax };
      else if (filter.priceMin) prixMatch['_valeur'] = { $gte: filter.priceMin };
      else prixMatch['_valeur'] = { $lte: filter.priceMax };
    }
    match['prix'] = { $elemMatch: prixMatch };
    match = {
      ...match,
      ...filter?.innerRequest,
      ...StationService.fromPositionRequestToMatchRequest(filter?.distance),
    };
    return this.prixModel
      .aggregate([
        {
          $match: match,
        },
      ])
      .exec() as Promise<StationPrixOnly[]>;
  }

  private static fromPositionRequestToMatchRequest(request: DistanceDto): any {
    if (!request) return {};
    const kmToLat = (dist: number) => dist / 110.574;
    const kmToLong = (dist: number) => dist / 111.32;

    const dLat = kmToLat(request.distance);
    const dLong = kmToLong(request.distance);
    const minLat = (request.position.lat - dLat) * 100000;
    const minLong = (request.position.long - dLong) * 100000;
    const maxLat = (request.position.lat + dLat) * 100000;
    const maxLong = (request.position.long + dLong) * 100000;

    return {
      _latitude: { $gte: minLat, $lte: maxLat },
      _longitude: { $gte: minLong, $lte: maxLong },
    };
  }

  retrieveFuelsAverage(filter: StationRequestDto): Promise<any[]> {
    let match: any = {};
    if (filter?.fuel) match['_nom'] = { $in: filter.fuel };
    if (filter?.postalCode) match['_cp'] = { $regex: filter.postalCode, $options: 'i' };
    if (filter?.priceMin || filter?.priceMax) {
      if (filter.priceMin && filter.priceMax) match['_valeur'] = { $gte: filter.priceMin, $lte: filter.priceMax };
      else if (filter.priceMin) match['_valeur'] = { $gte: filter.priceMin };
      else match['_valeur'] = { $lte: filter.priceMax };
    }
    match = {
      ...match,
      ...filter?.innerRequest,
      ...StationService.fromPositionRequestToMatchRequest(filter?.distance),
    };
    console.log(match);
    return this.stationModel
      .aggregate([
        {
          $unwind: '$prix',
        },
        {
          $match: match,
        },
        {
          $group: {
            _id: {
              id: '$prix._id',
              nom: '$prix._nom',
            },
            average: {
              $avg: '$prix._valeur',
            },
          },
        },
      ])
      .exec()
      .then((lst) => lst.map((i) => new FuelPriceDto(i)));
  }
}
