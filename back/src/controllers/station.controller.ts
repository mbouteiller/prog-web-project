import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { StationService } from '../services/station.service';
import { Station } from '../schemas/station.schema';
import { StationRequestDto } from '../dtos/station_entries.dto';
import { StationDto } from '../dtos/station/station.dto';
import { ApiBody, ApiExcludeEndpoint, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StationPrixOnly } from '../schemas/station-prix-only.schema';
import { StationPrixOnlyDto } from '../dtos/station/station-prix-only.dto';
import { FuelPriceDto } from '../dtos/station/fuel-price.dto';

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
  @ApiResponse({
    type: [StationDto],
  })
  @Post()
  @HttpCode(200)
  GetStationFromFilter(@Body() filter: StationRequestDto): Promise<StationDto[]> {
    return this.appService.getWithFilter(filter).then((lst) => lst.map((s) => new StationDto(s)));
  }

  @ApiOperation({
    summary: 'Get price history of station corresponding to the research',
  })
  @ApiResponse({
    type: [StationPrixOnlyDto],
  })
  @Post('/prix')
  @HttpCode(200)
  GetStationPrixFromFilter(@Body() filter: StationRequestDto): Promise<StationPrixOnlyDto[]> {
    return this.appService.getPrixWithFilter(filter).then((lst) => lst.map((s) => new StationPrixOnlyDto(s)));
  }
}
