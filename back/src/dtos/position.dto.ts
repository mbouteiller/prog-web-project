import { IsLatitude, IsLongitude, IsNumber } from 'class-validator';

export class PositionDto {
  @IsLatitude()
  public lat: number;

  @IsLongitude()
  public long: number;
}
