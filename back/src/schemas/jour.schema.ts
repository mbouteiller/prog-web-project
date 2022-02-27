import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Horaire, HoraireSchema } from './horaire.schema';

export type JourDocument = Jour & Document;

@Schema()
export class Jour {
  @Prop()
  _id: number;

  @Prop()
  _nom: string;

  @Prop()
  _ferme: string;

  @Prop({ type: HoraireSchema })
  horaire: Horaire;
}

export const JourSchema = SchemaFactory.createForClass(Jour);
