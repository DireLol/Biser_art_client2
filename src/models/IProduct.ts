export interface IProduct {
    productId: number;
    name: string;
    img: string;
    price: number;
    discount?: number; // Опционально, если у продукта есть скидка
}