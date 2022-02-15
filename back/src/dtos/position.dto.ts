import { IsLatitude, IsLongitude } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PositionDto {
  @ApiProperty({
    description: 'The latitude of the referred position',
    example: '43.6201',
  })
  @IsLatitude()
  public lat: number;

  @ApiProperty({
    description: 'The longitude of the referred position',
    example: '7.06837',
  })
  @IsLongitude()
  public long: number;
}
