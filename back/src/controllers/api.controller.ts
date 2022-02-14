import { Controller, Get } from '@nestjs/common';
import { StationService } from '../services/station.service';

@Controller('api')
export class ApiController {
  constructor(private readonly appService: StationService) {}
  @Get('fuel')
  GetAllFuelAvailable() {
    return this.appService.retrieveFuels();
  }
}
