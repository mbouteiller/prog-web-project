import { ScheduleDto } from './schedule.dto';
import { FuelDto } from './fuel.dto';
import { ClosureDto, ClosureType } from './closure.dto';
import { SoldOutDto } from './sold-out.dto';
import { Station } from '../../schemas/station.schema';
import { Day, DayScheduleDto } from './day-schedule.dto';
import { TimeScheduleDto } from './time-schedule.dto';

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
      this.horaires = {
        automate: !!schema.horaires?.['_automate-24-24'],
        jour: !schema.horaires.jour
          ? []
          : schema.horaires.jour.map((j) => {
              return {
                id: j._id,
                nom: Day[j._nom],
                ferme: !!j._ferme,
                horaire: !j.horaire
                  ? undefined
                  : ({
                      ouverture: j.horaire._ouverture,
                      fermeture: j.horaire._fermeture,
                    } as TimeScheduleDto),
              } as DayScheduleDto;
            }),
      } as ScheduleDto;
    }
    this.services = schema.services ? schema.services : [];
    if (schema.prix) {
      this.prix = schema.prix.map((f) => {
        return {
          nom: f._nom,
          id: f._id,
          maj: f._maj,
          valeur: f._valeur,
        } as FuelDto;
      });
    } else this.prix = [];
    if (schema.rupture) {
      this.rupture = schema.rupture.map((r) => {
        return r
          ? ({
              nom: r._nom,
              id: r._id,
              debut: r._debut,
              fin: r._fin,
            } as SoldOutDto)
          : undefined;
      });
      if (this.rupture.length && !this.rupture[0]) this.rupture = [];
    } else this.rupture = [];
    if (schema.fermeture) {
      this.fermeture = schema.fermeture.map((f) => {
        return {
          type: ClosureType[f.type],
          debut: f.debut,
          fin: f.fin,
        } as ClosureDto;
      });
    } else this.fermeture = [];
  }
}

export enum StationType {
  ROUTE = 'R',
  AUTOROUTE = 'A',
}
