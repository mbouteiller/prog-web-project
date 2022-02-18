import { TimeScheduleDto } from './time-schedule.dto';
import { ApiProperty } from '@nestjs/swagger';

export class DayScheduleDto {
  @ApiProperty({
    example: '1',
  })
  id: number;
  @ApiProperty({
    example: 'Mardi',
  })
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
