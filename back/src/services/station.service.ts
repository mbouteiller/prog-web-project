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
    let query: any = {};
    if (filter.priceMin) query['prix._valeur'] = { $gte: filter.priceMin, $lte: filter.priceMax };
    return this.stationModel.find(query).exec();
  }

  retrieveFuels() {
    return this.stationModel.distinct('prix._nom');
  }
}
