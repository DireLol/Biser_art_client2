import $api from "../http";

export default class ProductService{
    
    static async fetchNewAndSpecialProducts() {
        try { 
            const response = await $api.get('/product/newAndSpecial')   
            return response.data;
        } catch(error){
            console.error('Failed to fetch new and special products:', error);
            return []; // Возвращаем пустой массив в случае ошибки
        }
    }
    
}