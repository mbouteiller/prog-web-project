import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { StationService } from './station.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Station, StationSchema } from './schema/station.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test_db'),

    MongooseModule.forFeature([{schema: StationSchema, name: Station.name, collection: 'Station'}], )
  ],
  controllers: [AppController],
  providers: [StationService],
})
export class AppModule {}
