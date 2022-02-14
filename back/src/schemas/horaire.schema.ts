import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HoraireDocument = Horaire & Document;

@Schema()
export class Horaire {
  @Prop()
  _ouverture: string;

  @Prop()
  _fermeture: string;
}

export const HoraireSchema = SchemaFactory.createForClass(Horaire);
