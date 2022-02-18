import { ApiProperty } from '@nestjs/swagger';

export class ClosureDto {
  @ApiProperty({
    example: 'D (definitive) or T (temporary)',
  })
  type: ClosureType;
  @ApiProperty({
    example: 'AAAA-MM-JJ HH:mm:ss',
  })
  debut: string; //AAAA-MM-JJ HH:mm:ss
  @ApiProperty({
    example: 'AAAA-MM-JJ HH:mm:ss',
  })
  fin: string; //AAAA-MM-JJ HH:mm:ss
}

export enum ClosureType {
  definitive = 'D',
  temporaire = 'T',
}
