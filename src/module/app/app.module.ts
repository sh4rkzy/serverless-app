import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogsInterceptor } from 'src/infrastructure/config/logger/log.interceptor';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [AppController],
  providers: [AppService, LogsInterceptor],
})
export class AppModule { }