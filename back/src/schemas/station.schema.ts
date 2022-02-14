import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StationDocument = Station & Document;

@Schema()
export class Station {
  @Prop()
  _id: number;

  @Prop()
  _cp: string;

  @Prop()
  _latitude: number;

  @Prop()
  _longitude: number;

  @Prop()
  _pop: string;

  @Prop()
  address: string;

  @Prop()
  ville: string;

  @Prop()
  horaires: {
    '_automate-24-24': string;
    jour: {
      _id: number;
      _nom: string;
      _ferme: string;
      horaire: {
        _ouverture: string;
        _fermeture: string;
      };
    }[];
  };

  @Prop()
  services: string[];

  @Prop()
  prix: {
    _nom: string;
    _id: number;
    _maj: string;
    _valeur: number;
  }[];

  @Prop()
  rupture: {
    _nom: string;
    _id: number;
    _debut: string;
    _fin: string;
  }[];

  @Prop()
  fermeture:
    | {
        type: string;
        debut: string;
        fin: string;
      }
    | {
        type: string;
        debut: string;
        fin: string;
      }[];
}

export const StationSchema = SchemaFactory.createForClass(Station);
