import { ApiProperty } from '@nestjs/swagger';

export class FuelDto {
  @ApiProperty({
    example: 'Gazole',
  })
  nom: string;
  @ApiProperty({
    example: '1',
  })
  id: number;
  @ApiProperty({
    example: 'AAAA-MM-JJ HH:mm:ss',
  })
  maj: string; //AAAA-MM-JJ HH:mm:ss
  @ApiProperty({
    example: '1.025',
  })
  valeur: number;
}
