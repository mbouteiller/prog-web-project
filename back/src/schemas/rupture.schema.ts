import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RuptureDocument = Rupture & Document;

@Schema()
export class Rupture {
  @Prop()
  _nom: string;

  @Prop()
  _id: number;

  @Prop()
  _debut: string;

  @Prop()
  _fin: string;
}

export const RuptureSchema = SchemaFactory.createForClass(Rupture);
