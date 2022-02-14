import { IsNumber, IsPositive, ValidateNested } from 'class-validator';
import { PositionDto } from './position.dto';

export class DistanceDto {
  @IsNumber()
  @IsPositive()
  public distance: number;

  @ValidateNested()
  public position: PositionDto;
}
