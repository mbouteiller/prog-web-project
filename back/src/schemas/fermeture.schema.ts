import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FermetureDocument = Fermeture & Document;

@Schema()
export class Fermeture {
  @Prop()
  type: string;

  @Prop()
  debut: string;

  @Prop()
  fin: string;
}

export const FermetureSchema = SchemaFactory.createForClass(Fermeture);
