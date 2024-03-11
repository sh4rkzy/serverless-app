import { BadRequestException, BadGatewayException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/config/database/prisma.service";
import { CreateProductDto } from "./dtos/products.dtos";

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }

    async createdProduct(data: CreateProductDto) {
        try {
            return await this.prisma.product.create({
                data: {
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    quantity: data.quantity
                }
            });
        } catch (error) {
            throw new BadGatewayException('Error creating product');
        }
    }

    async getProducts() {
        try {
            return await this.prisma.product.findMany();
        } catch (error) {
            throw new BadRequestException('Error getting products');
        }
    }

    async salesProduct(id: string, quantity: number) {
        try {
            const product = await this.prisma.product.findUnique({
                where: {
                    id: id
                }
            });

            if (product.quantity < quantity) {
                throw new BadRequestException('Insufficient quantity');
            }

            return await this.prisma.product.update({
                where: {
                    id: id
                },
                data: {
                    quantity: product.quantity - quantity
                }
            });
        } catch (error) {
            throw new BadRequestException('Error selling product');
        }
    }
}
