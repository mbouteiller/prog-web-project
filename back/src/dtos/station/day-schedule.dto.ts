import { TimeScheduleDto } from './time-schedule.dto';

export class DayScheduleDto {
  id: number;
  nom: Day;
  ferme: boolean;
  horaire: TimeScheduleDto;
}

export enum Day {
  LUNDI = 'Lundi',
  MARDI = 'Mardi',
  MERCREDI = 'Mercredi',
  JEUDI = 'Jeudi',
  VENDREDI = 'Vendredi',
  SAMEDI = 'Samedi',
  DIMANCHE = 'Dimanche',
}
