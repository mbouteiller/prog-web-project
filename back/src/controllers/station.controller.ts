import { Body, Controller, Get, Query } from '@nestjs/common';
import { StationService } from '../services/station.service';
import { Station } from '../schemas/station.schema';
import { StationEntriesDto } from '../dtos/station_entries.dto';
import { StationDto } from '../dtos/station/station.dto';

@Controller('stations')
export class StationController {
  constructor(private readonly appService: StationService) {}

  @Get('test')
  test(@Query('cp') cp: string): Promise<StationDto[]> {
    if (cp) return this.appService.getAllFromCp(cp).then((lst) => lst.map((s) => new StationDto(s)));
    else return this.appService.getAll().then((lst) => lst.map((s) => new StationDto(s)));
  }

  @Get()
  GetStationFromFilter(@Body() filter: StationEntriesDto) {
    return this.appService.getWithFilter(filter);
  }
}
