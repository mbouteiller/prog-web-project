import {IsArray, IsNumber, IsOptional, IsString, Min, ValidateNested} from 'class-validator';
import { DistanceDto } from './distance.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StationRequestDto {
  @ApiPropertyOptional({
    description: 'The minimum price that the User wants to pay',
    example: '0.5',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  public priceMin: number;

  @ApiPropertyOptional({
    description: 'The maximum price that the User wants to pay',
    example: '1.5',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  public priceMax: number;

  @ApiPropertyOptional({
    description: 'Search stations in a radius of X km around the given position',
  })
  @ValidateNested()
  @IsOptional()
  public distance: DistanceDto;

  @ApiPropertyOptional({
    description: 'Search only station with the postal code',
    example: '01000',
  })
  @IsString()
  @IsOptional()
  public postalCode: string;

  @ApiPropertyOptional({
    description: 'Search only station which sell this type of fuel',
    example: ['Gazole'],
  })
  @IsArray()
  public fuel: string[];
}
