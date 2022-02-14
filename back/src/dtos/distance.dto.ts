import { IsNotEmpty, IsNumber, IsPositive, ValidateNested } from 'class-validator';
import { PositionDto } from './position.dto';
import { ApiProperty } from '@nestjs/swagger';

export class DistanceDto {
  @ApiProperty({
    description: 'The distance limit around the referred position',
    example: '100',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  public distance: number;

  @ApiProperty({
    description: 'The referred position',
  })
  @IsNotEmpty()
  @ValidateNested()
  public position: PositionDto;
}
