import { IProduct } from './IProduct'
export interface ICartProduct {
    cartProductId: number;
    product: IProduct;
    quantity: number;
    size: string;
}