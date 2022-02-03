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
  _lat: number;

  @Prop()

  _long: number;

  @Prop()
  address: string;
}

export const StationSchema = SchemaFactory.createForClass(Station);