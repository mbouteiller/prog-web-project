import { ScheduleDto } from './schedule.dto';
import { FuelDto } from './fuel.dto';
import { ClosureDto } from './closure.dto';
import { SoldOutDto } from './sold-out.dto';
import { Station } from '../../schemas/station.schema';

export class StationDto {
  cp: string;
  department_num: string;
  latitude: number;
  longitude: number;
  type: StationType;
  address: string;
  ville: string;
  horaires: ScheduleDto;
  services: string[];
  prix: FuelDto[];
  rupture: SoldOutDto[];
  fermeture: ClosureDto[];

  constructor(schema: Station) {
    if (schema._cp) {
      this.cp = schema._cp;
      this.department_num = schema._cp.slice(0, 2);
    }
    if (schema._longitude) this.longitude = schema._longitude;
    if (schema._latitude) this.latitude = schema._latitude;
    if (schema._latitude) this.latitude = schema._latitude;
    if (schema._pop) this.type = StationType[schema._pop];
    if (schema.address) this.address = schema.address;
    if (schema.ville) this.ville = schema.ville;
    if (schema.horaires) {
      //TODO continue
    }
  }
}

export enum StationType {
  ROUTE = 'R',
  AUTOROUTE = 'A',
}
