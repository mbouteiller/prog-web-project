import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Horaires, HorairesSchema } from './horaires.schema';
import { Prix, PrixSchema } from './prix.schema';
import { Rupture, RuptureSchema } from './rupture.schema';
import { Fermeture, FermetureSchema } from './fermeture.schema';

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
  adresse: string;

  @Prop()
  ville: string;

  @Prop({ type: HorairesSchema })
  horaires: Horaires;

  @Prop()
  services: string[];

  @Prop({ type: [PrixSchema] })
  prix: Prix[];

  @Prop({ type: [RuptureSchema] })
  rupture: Rupture[];

  @Prop({ type: [FermetureSchema] })
  fermeture: Fermeture[];
}

export const StationSchema = SchemaFactory.createForClass(Station);
