import { Body, Controller, Get, Post } from '@nestjs/common';
import { StationService } from '../services/station.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StationRequestDto } from '../dtos/station_entries.dto';
import { FuelPriceDto } from '../dtos/station/fuel-price.dto';

@ApiTags('fuel')
@Controller('fuel')
export class FuelController {
  constructor(private readonly appService: StationService) {}

  @ApiOperation({
    summary: 'Get all fuels available in the database',
  })
  @Get()
  GetAllFuelAvailable() {
    return this.appService.retrieveFuels();
  }

  @ApiOperation({
    summary: 'Get the average of price of station corresponding to the request',
  })
  @ApiResponse({
    type: [FuelPriceDto],
  })
  @Post('average')
  GetFuelAverage(@Body() filter: StationRequestDto): Promise<FuelPriceDto[]> {
    return this.appService.retrieveFuelsAverage(filter);
  }
}
