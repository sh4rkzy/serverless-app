import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogsInterceptor } from 'src/infrastructure/config/logger/log.interceptor';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'APP_INTERCEPTOR',
    useClass: LogsInterceptor,
  }],
})
export class AppModule { }
