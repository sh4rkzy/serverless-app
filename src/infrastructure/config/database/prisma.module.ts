import { Module } from '@nestjs/common';
import { PrismaLoggerService } from './prisma-logger.service';
import { PrismaService } from './prisma.service';

@Module({
    providers: [PrismaService, PrismaLoggerService],
    exports: [PrismaService],
})
export class PrismaModule { }