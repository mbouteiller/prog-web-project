import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Prix, PrixSchema } from './prix.schema';

export type StationPrixOnlyDocument = StationPrixOnly & Document;

@Schema()
export class StationPrixOnly {
  @Prop()
  _id: number;

  @Prop()
  _cp: string;

  @Prop()
  _latitude: number;

  @Prop()
  _longitude: number;

  @Prop()
  address: string;

  @Prop()
  ville: string;

  @Prop({ type: [PrixSchema] })
  prix: Prix[];
}

export const StationPrixOnlySchema = SchemaFactory.createForClass(StationPrixOnly);
