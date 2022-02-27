import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PrixDocument = Prix & Document;

@Schema()
export class Prix {
  @Prop()
  _nom: string;

  @Prop()
  _id: number;

  @Prop()
  _maj: string;

  @Prop()
  _valeur: number;
}

export const PrixSchema = SchemaFactory.createForClass(Prix);
