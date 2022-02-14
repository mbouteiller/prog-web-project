import { Body, Controller, Get, Query } from '@nestjs/common';
import { StationService } from '../services/station.service';
import { Station } from '../schemas/station.schema';
import { StationEntriesDto } from '../dtos/station_entries.dto';
import { StationDto } from '../dtos/station/station.dto';
import { ApiBody, ApiExcludeEndpoint, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('station')
@Controller('stations')
export class StationController {
  constructor(private readonly appService: StationService) {}

  @ApiExcludeEndpoint()
  @Get('test')
  test(@Query('cp') cp: string, @Query('raw') raw = false): Promise<Station[] | StationDto[]> {
    if (cp && raw) return this.appService.getAllFromCp(cp);
    if (cp) return this.appService.getAllFromCp(cp).then((lst) => lst.map((s) => new StationDto(s)));
    else return this.appService.getAll().then((lst) => lst.map((s) => new StationDto(s)));
  }

  @ApiOperation({
    summary: 'Get all station corresponding of the research',
  })
  @Get()
  GetStationFromFilter(@Body() filter: StationEntriesDto) {
    return this.appService.getWithFilter(filter);
  }
}
