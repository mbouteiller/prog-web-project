import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Jour, JourSchema } from './jour.schema';

export type HorairesDocument = Horaires & Document;

@Schema()
export class Horaires {
  @Prop()
  '_automate-24-24': string;

  @Prop({ type: [JourSchema] })
  jour: Jour[];
}

export const HorairesSchema = SchemaFactory.createForClass(Horaires);
