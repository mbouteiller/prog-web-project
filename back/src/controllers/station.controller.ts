import { Controller, Get, Query } from "@nestjs/common";
import { StationService } from '../services/station.service';
import { Station } from '../schemas/station.schema';

@Controller()
export class StationController {
  constructor(private readonly appService: StationService) {}

  @Get()
  test(@Query('cp') cp: string): Promise<Station[]> {
    if(cp) return this.appService.getAllFromCp(cp);
    else return this.appService.getAll();
  }
}
