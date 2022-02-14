import { IsNumber, IsString, Min, ValidateNested } from 'class-validator';
import { DistanceDto } from './distance.dto';

export class StationEntriesDto {
  @IsNumber()
  @Min(0)
  public priceMin: number;

  @IsNumber()
  @Min(0)
  public priceMax: number;

  @ValidateNested()
  public distance: DistanceDto;

  @IsString()
  public postalCode: string;
}
