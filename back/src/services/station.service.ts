import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Station, StationDocument } from '../schemas/station.schema';
import { Model } from 'mongoose';
import { StationRequestDto } from '../dtos/station_entries.dto';
import { StationPrixOnly } from '../schemas/station-prix-only.schema';

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
    const match: any = {};
    const prixMatch: any = {};
    if (filter.fuel) prixMatch['_nom'] = { $in: filter.fuel };
    if (filter.postalCode) match['_cp'] = { $regex: filter.postalCode, $options: 'i' };
    if (filter.priceMin || filter.priceMax) {
      if (filter.priceMin && filter.priceMax) prixMatch['_valeur'] = { $gte: filter.priceMin, $lte: filter.priceMax };
      else if (filter.priceMin) prixMatch['_valeur'] = { $gte: filter.priceMin };
      else prixMatch['_valeur'] = { $lte: filter.priceMax };
    }
    match['prix'] = { $elemMatch: prixMatch };
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
    const match: any = {};
    const prixMatch: any = {};
    if (filter.fuel) prixMatch['_nom'] = { $in: filter.fuel };
    if (filter.postalCode) match['_cp'] = { $regex: filter.postalCode, $options: 'i' };
    if (filter.priceMin || filter.priceMax) {
      if (filter.priceMin && filter.priceMax) prixMatch['_valeur'] = { $gte: filter.priceMin, $lte: filter.priceMax };
      else if (filter.priceMin) prixMatch['_valeur'] = { $gte: filter.priceMin };
      else prixMatch['_valeur'] = { $lte: filter.priceMax };
    }
    match['prix'] = { $elemMatch: prixMatch };
    return this.prixModel
      .aggregate([
        {
          $match: match,
        },
      ])
      .exec() as Promise<StationPrixOnly[]>;
  }
}
