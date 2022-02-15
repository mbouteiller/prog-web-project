import { Controller, Get } from '@nestjs/common';
import { StationService } from '../services/station.service';
import {ApiOperation} from "@nestjs/swagger";

@Controller('api')
export class ApiController {
  constructor(private readonly appService: StationService) {}

  @ApiOperation({
    summary: 'Get all fuels available in the database',
  })
  @Get('fuel')
  GetAllFuelAvailable() {
    return this.appService.retrieveFuels();
  }
}
