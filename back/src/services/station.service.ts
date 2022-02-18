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

  getPrixWithFilter(filter: StationRequestDto): Promise<StationPrixOnly[]> {
    const query: any = {};
    console.log('cp :', filter.postalCode);
    if (filter.postalCode) query['_cp'] = { $regex: filter.postalCode, $options: 'i' };
    // //TODO update fuel filter
    // if (filter.fuel) query['prix._nom'] = filter.fuel;
    // //TODO price distance
    // if (filter.distance) {
    //   query['_latitude'] = filter.distance.position.lat;
    //   query['_longitude'] = filter.distance.position.long;
    // }
    return this.prixModel.find(query).exec();
  }
}
