import { IsLatitude, IsLongitude } from 'class-validator';

export class PositionDto {
  @IsLatitude()
  public lat: number;

  @IsLongitude()
  public long: number;
}
