import { Body, Controller, Get, Query } from '@nestjs/common';
import { StationService } from '../services/station.service';
import { Station } from '../schemas/station.schema';
import { StationEntriesDto } from '../dtos/station_entries.dto';

@Controller('station')
export class StationController {
  constructor(private readonly appService: StationService) {}

  @Get('test')
  test(@Query('cp') cp: string): Promise<Station[]> {
    if (cp) return this.appService.getAllFromCp(cp);
    else return this.appService.getAll();
  }

  @Get()
  GetStationFromFilter(@Body() filter: StationEntriesDto) {
    return this.appService.getWithFilter(filter);
  }
}
