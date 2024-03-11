import { Controller, Body, Res, Req, HttpCode, HttpStatus } from "@nestjs/common";
import {
    Post,
    Get,
    Put,
    Delete,
} from "@nestjs/common";
import { ProductsService } from "./products.service";


@Controller('v1/products')

export class ProductsController {
    constructor(
        private productsService: ProductsService
    ) { }

    @Get('/')
    async getProducts(@Res() res) {
        try {
            const products = await this.productsService.getProducts();
            return res.status(HttpStatus.OK).json(products);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }
    @Post('/crated')
    async createdProduct(@Body() data, @Res() res, @Req() req) {
        try {
            const product = await this.productsService.createdProduct(data);
            return res.status(HttpStatus.CREATED).json(product);
        } catch (error) {
            return res.status(HttpStatus.BAD_GATEWAY).json({ message: error.message });
        }
    }

    @Put('/sales/:id')
    async salesProduct(@Body() data, @Res() res, @Req() req) {
        try {
            const product = await this.productsService.salesProduct(req.params.id, data.quantity);
            return res.status(HttpStatus.OK).json(product);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }
}