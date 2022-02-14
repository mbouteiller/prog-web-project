import { Module } from '@nestjs/common';
import { StationController } from './controllers/station.controller';
import { StationService } from './services/station.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Station, StationSchema } from './schemas/station.schema';
import {ApiController} from "./controllers/api.controller";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://PW_team1_user:PW_team1_pwd@progwebcluster.lffk9.mongodb.net/PW_team1_db'),

    MongooseModule.forFeature([{schema: StationSchema, name: Station.name, collection: 'Station'}], )
  ],
  controllers: [StationController, ApiController],
  providers: [StationService],
})
export class AppModule {}
