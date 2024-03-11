import { IsString, IsNotEmpty, IsNumber, IsInt, IsDate, IsOptional } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsInt()
    quantity: number;

    @IsDate()
    createdAt?: Date;

    @IsDate()
    updatedAt?: Date;
}
