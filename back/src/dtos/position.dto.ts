import { IsLatitude, IsLongitude } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PositionDto {
  @ApiProperty({
    example: '43.6201',
  })
  @IsLatitude()
  public lat: number;

  @ApiProperty({
    example: '7.06837',
  })
  @IsLongitude()
  public long: number;
}
