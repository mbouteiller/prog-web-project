import { FuelDto } from './fuel.dto';
import { StationPrixOnly } from '../../schemas/station-prix-only.schema';
import { ApiProperty } from '@nestjs/swagger';

export class StationPrixOnlyDto {
  @ApiProperty({
    example: '01000',
  })
  cp: string;
  @ApiProperty({
    example: '01',
  })
  department_num: string;
  @ApiProperty()
  latitude: number;
  @ApiProperty()
  longitude: number;
  @ApiProperty()
  adresse: string;
  @ApiProperty()
  ville: string;
  @ApiProperty({
    type: [FuelDto],
  })
  prix: FuelDto[];

  constructor(schema: StationPrixOnly) {
    if (schema._cp) {
      this.cp = schema._cp;
      this.department_num = schema._cp.slice(0, 2);
    }
    if (schema._longitude) this.longitude = schema._longitude / 100000;
    if (schema._latitude) this.latitude = schema._latitude / 100000;
    if (schema.address) this.address = schema.address;
    if (schema.ville) this.ville = schema.ville;
    if (schema.prix) {
      this.prix = schema.prix.map((f) => {
        return {
          nom: f._nom,
          id: f._id,
          maj: f._maj,
          valeur: f._valeur / 1000,
        } as FuelDto;
      });
    } else this.prix = [];
  }
}
