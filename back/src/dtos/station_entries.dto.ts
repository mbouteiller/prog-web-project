import { IsNumber, IsString, Min, ValidateNested } from 'class-validator';
import { DistanceDto } from './distance.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StationEntriesDto {
  @ApiPropertyOptional({
    example: '0.5',
  })
  @IsNumber()
  @Min(0)
  public priceMin: number;

  @ApiPropertyOptional({
    example: '1.5',
  })
  @IsNumber()
  @Min(0)
  public priceMax: number;

  @ApiPropertyOptional({
    description: 'Search only station x km arround the given position',
  })
  @ValidateNested()
  public distance: DistanceDto;

  @ApiPropertyOptional({
    description: 'Search only station with this postal code',
    example: '01000',
  })
  @IsString()
  public postalCode: string;

  @ApiPropertyOptional({
    description: 'Search only station which sell this type of fuel',
  })
  @IsString()
  public carburant: string;
}
