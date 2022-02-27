import { IsLatitude, IsLongitude } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PositionDto {
  @ApiProperty({
    description: 'The latitude of the referred position',
    example: '46.20754',
  })
  @IsLatitude()
  public lat: number;

  @ApiProperty({
    description: 'The longitude of the referred position',
    example: '5.23758',
  })
  @IsLongitude()
  public long: number;
}
