import { Controller, Get } from '@nestjs/common';
import { StationService } from './station.service';
import { Station } from './schema/station.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: StationService) {}

  @Get()
  test(): Promise<Station[]> {
    return this.appService.getAll();
  }
}
