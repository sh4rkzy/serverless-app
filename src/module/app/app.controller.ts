import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/v1/health')
  getHealth(): string {
    return this.appService.getHealth();
  }
}
