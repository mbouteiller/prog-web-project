import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Station, StationDocument } from '../schemas/station.schema';
import { Model } from 'mongoose';
import { StationRequestDto } from '../dtos/station_entries.dto';

@Injectable()
export class StationService {
  constructor(@InjectModel(Station.name) private stationModel: Model<StationDocument>) {}

  getAll(): Promise<Station[]> {
    return this.stationModel.find().exec();
  }

  getAllFromCp(cp: string): Promise<Station[]> {
    return this.stationModel.find({ _cp: cp }).exec();
  }

  getWithFilter(filter: StationRequestDto) {
    const match: any = {};
    if (filter.fuel) match['prix._nom'] = { $in: filter.fuel };
    if (filter.postalCode) match['_cp'] = { $regex: filter.postalCode, $options: 'i' };
    if (filter.priceMin || filter.priceMax) {
      if (filter.priceMin && filter.priceMax) match['prix._valeur'] = { $gte: filter.priceMin, $lte: filter.priceMax };
      else if (filter.priceMin) match['prix._valeur'] = { $gte: filter.priceMin };
      else match['prix._valeur'] = { $lte: filter.priceMax };
    }
    return this.stationModel.aggregate([
      {
        $unwind: '$prix',
      },
      {
        $match: match,
      },
      {
        $group: {
          _id: '$_id',
          prix: {
            $push: '$prix',
          },
        },
      },
    ]);
  }

  retrieveFuels() {
    return this.stationModel.distinct('prix._nom');
  }
}
