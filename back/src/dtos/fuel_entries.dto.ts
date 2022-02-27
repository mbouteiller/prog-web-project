import { IsArray, IsNumber, IsObject, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { DistanceDto } from './distance.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FuelRequestDto {
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
    description: 'Search only station which sell this type of fuel',
    example: 'Gazole',
  })
  @IsString()
  @IsOptional()
  public fuel: string;
}
