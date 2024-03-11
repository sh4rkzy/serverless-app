import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { PrismaService } from "src/infrastructure/config/database/prisma.service";
import { PrismaLoggerService } from "src/infrastructure/config/database/prisma-logger.service";

@Module({
    controllers: [ProductsController],
    providers: [ProductsService, PrismaService, PrismaLoggerService],
})

export class ProductsModule { }