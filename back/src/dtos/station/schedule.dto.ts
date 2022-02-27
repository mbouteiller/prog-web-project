import { DayScheduleDto } from './day-schedule.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ScheduleDto {
  @ApiProperty({
    description: 'Presence of a vending automate.',
  })
  automate: boolean;
  @ApiProperty({
    type: [DayScheduleDto],
  })
  jour: DayScheduleDto[];
}
