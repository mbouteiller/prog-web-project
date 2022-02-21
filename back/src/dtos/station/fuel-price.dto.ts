import { ApiProperty } from '@nestjs/swagger';

export class FuelPriceDto {
  @ApiProperty({
    example: '1',
  })
  id: string;
  @ApiProperty({
    example: 'Gazole',
  })
  nom: string;
  @ApiProperty({
    example: '1.6',
  })
  average: number;

  constructor(data: any) {
    this.id = data._id.id;
    this.nom = data._id.nom;
    this.average = data.average;
  }
}
