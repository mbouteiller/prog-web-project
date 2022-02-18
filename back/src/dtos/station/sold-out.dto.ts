import { ApiProperty } from '@nestjs/swagger';

export class SoldOutDto {
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
  debut: string; //AAAA-MM-JJ HH:mm:ss
  @ApiProperty({
    example: 'AAAA-MM-JJ HH:mm:ss',
  })
  fin: string; //AAAA-MM-JJ HH:mm:ss
}
