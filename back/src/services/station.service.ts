import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Station, StationDocument } from '../schemas/station.schema';
import { Model } from 'mongoose';
import { StationRequestDto } from '../dtos/station_entries.dto';
import { StationPrixOnly } from '../schemas/station-prix-only.schema';
import { PositionDto } from '../dtos/position.dto';
import { DistanceDto } from '../dtos/distance.dto';
import { FuelPriceDto } from '../dtos/station/fuel-price.dto';
import { FuelRequestDto } from '../dtos/fuel_entries.dto';

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
    const fuelMatches: any[] = StationService.fromFuelFilterToMatchRequest(filter?.fuelFilter);
    if (filter?.postalCode) match['_cp'] = { $regex: '^' + filter.postalCode, $options: 'i' };
    match = {
      ...match,
      ...filter?.innerRequest,
      ...StationService.fromPositionRequestToMatchRequest(filter?.distance),
    };
    return this.stationModel
      .aggregate(
        [
          {
            $match: match,
          },
        ].concat(fuelMatches),
      )
      .exec();
  }

  retrieveFuels() {
    return this.stationModel.distinct('prix._nom');
  }

  getPrixWithFilter(filter: StationRequestDto): Promise<StationPrixOnly[]> {
    let match: any = {};
    const fuelMatches: any[] = StationService.fromFuelFilterToMatchRequest(filter?.fuelFilter);
    if (filter?.postalCode) match['_cp'] = { $regex: '^' + filter.postalCode, $options: 'i' };
    match = {
      ...match,
      ...filter?.innerRequest,
      ...StationService.fromPositionRequestToMatchRequest(filter?.distance),
    };
    return this.prixModel
      .aggregate(
        [
          {
            $match: match,
          },
        ].concat(fuelMatches),
      )
      .exec() as Promise<StationPrixOnly[]>;
  }

  retrieveFuelsAverage(filter: StationRequestDto): Promise<any[]> {
    let match: any = {};
    if (filter?.postalCode) match['_cp'] = { $regex: '^' + filter.postalCode, $options: 'i' };
    const fuelMatches: any[] = StationService.fromFuelFilterToMatchRequest(filter?.fuelFilter);
    match = {
      ...match,
      ...filter?.innerRequest,
      ...StationService.fromPositionRequestToMatchRequest(filter?.distance),
    };
    return this.stationModel
      .aggregate(
        fuelMatches.concat([
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
        ]),
      )
      .exec()
      .then((lst) => lst.map((i) => new FuelPriceDto(i)));
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

  private static fromFuelFilterToMatchRequest(request: FuelRequestDto[] | undefined): any[] {
    if (!request) return [];
    const result = [];
    request.forEach((f) => {
      const insideMatch = {};
      if (f?.fuel) insideMatch['_nom'] = f.fuel;
      if (f?.priceMin || f?.priceMax) {
        if (f.priceMin && f.priceMax) insideMatch['_valeur'] = { $gte: f.priceMin * 1000, $lte: f.priceMax * 1000 };
        else if (f.priceMin) insideMatch['_valeur'] = { $gte: f.priceMin * 1000 };
        else insideMatch['_valeur'] = { $lte: f.priceMax * 1000 };
      }
      result.push({
        $match: {
          prix: {
            $elemMatch: insideMatch,
          },
        },
      });
    });
    return result;
  }
}
