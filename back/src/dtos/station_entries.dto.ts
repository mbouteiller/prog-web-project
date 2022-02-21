import { IsArray, IsNumber, IsObject, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { DistanceDto } from './distance.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FuelRequestDto } from './fuel_entries.dto';

export class StationRequestDto {
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
    type: [FuelRequestDto],
  })
  @IsArray()
  @IsOptional()
  @ValidateNested()
  public fuelFilter: FuelRequestDto[];

  @IsOptional()
  @IsObject()
  public innerRequest: any;
}
