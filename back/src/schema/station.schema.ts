import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StationDocument = Station & Document;

@Schema()
export class Station {
  @Prop({alias: '@id'})
  id: number;

  @Prop({alias: '@cp'})
  cp: string;

  @Prop({alias: '@latitude'})
  lat: number;

  @Prop({alias: '@longitude'})
  long: number;

  @Prop()
  address: string;
}

export const StationSchema = SchemaFactory.createForClass(Station);