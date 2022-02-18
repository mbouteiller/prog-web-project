import { ApiProperty } from '@nestjs/swagger';

export class TimeScheduleDto {
  @ApiProperty({
    example: 'AAAA-MM-JJ HH:mm:ss',
  })
  ouverture: string; //AAAA-MM-JJ HH:mm:ss
  @ApiProperty({
    example: 'AAAA-MM-JJ HH:mm:ss',
  })
  fermeture: string; //AAAA-MM-JJ HH:mm:ss
}
