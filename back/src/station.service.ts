import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Station, StationDocument } from './schema/station.schema';
import { Model } from 'mongoose';

@Injectable()
export class StationService {
  constructor(@InjectModel(Station.name) private stationModel: Model<StationDocument>) {
  }

  getAll(): Promise<Station[]> {
    return this.stationModel.find().exec();
  }
}
