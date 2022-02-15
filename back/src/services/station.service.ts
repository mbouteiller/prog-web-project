import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Station, StationDocument } from '../schemas/station.schema';
import { Model } from 'mongoose';
import { StationEntriesDto } from '../dtos/station_entries.dto';

@Injectable()
export class StationService {
  constructor(@InjectModel(Station.name) private stationModel: Model<StationDocument>) {}

  getAll(): Promise<Station[]> {
    return this.stationModel.find().exec();
  }

  getAllFromCp(cp: string): Promise<Station[]> {
    return this.stationModel.find({ _cp: cp }).exec();
  }

  getWithFilter(filter: StationEntriesDto) {
    const query: any = {};
    if (filter.postalCode) query['_cp'] = { $regex: filter.postalCode, $options: 'i' };
    if (filter.fuel) query['prix._nom'] = filter.fuel;
    //TODO price filter
    if (filter.priceMin || filter.priceMax) {
      if (filter.priceMin && filter.priceMax) query['prix._valeur'] = { $gte: filter.priceMin, $lte: filter.priceMax };
      else if (filter.priceMin) query['prix._valeur'] = { $gte: filter.priceMin };
      else query['prix._valeur'] = { $lte: filter.priceMax };
    }
    //TODO price distance
    if (filter.distance) {
      query['_latitude'] = filter.distance.position.lat;
      query['_longitude'] = filter.distance.position.long;
    }
    console.log(query);
    return this.stationModel.find(query).exec();
  }

  retrieveFuels() {
    return this.stationModel.distinct('prix._nom');
  }
}
