import { makeAutoObservable } from "mobx";
import BlueCaplyaRing from '../images/internetImg/BlueCaplyaRing.png'
import BlueEtnicRing from '../images/internetImg/BlueEtnicRing.png'
import BlueMinimalismRing from '../images/internetImg/BlueMinimalismRing.png'
import BlueSea from '../images/internetImg/BlueSea.png'
import BlueWater from '../images/internetImg/BlueWater.png'
import EtnicRedUzor from '../images/internetImg/EtnicRedUzor.png'
import BatFly from '../images/internetImg/BatFly.jpg'
import BlackRing from '../images/internetImg/BlackRing.jpeg'
import BlueBraslet from '../images/internetImg/BlueBraslet.jpg'
import BlueBrosh from '../images/internetImg/BlueBrosh.jpg'
import EtnicCulon from '../images/internetImg/EtnicCulon.jpg'
import GreenBlacelet from '../images/internetImg/GreenBlacelet.jpg'
import GreenForestBracelet from '../images/internetImg/GreenForestBracelet.jpg'
import RedBracelet from '../images/internetImg/RedBracelet.jpg'
import RedBracenet from '../images/internetImg/RedBracenet.jpg'
import BlackExpress from '../images/internetImg/BlackExpress.jpg'
import podsolnychiRing from '../images/internetImg/podsolnychiRing.png'

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    recommended: boolean;
    color: string;
    style: string;
    category: string;
    description: string;
    sizes: string;
  }
  export interface Order {
    id: number;
    name: string;
    email: string;
    phone: string;
    description: string;
    materials: string;
}
  export default class AdminStore {
    users = [
        { id: 1, name: "DireFox1", email: "gdgtdesd3s@gmail.com" },
        { id: 2, name: "FireFox", email: "kanishheva_oksana@mail.ru" },
      ];
    
      products: Product[] = [
        { id: 1, name: "Красный Чарм", price: 100, image: `${EtnicRedUzor}`, recommended: false, color: 'Красный', style: 'Классический', category: 'Браслеты', description: 'Этот красный браслет не только стильный аксессуар, но и символ страсти и силы. Его классический дизайн и яркий красный цвет сделают ваш образ неповторимым.', sizes: 'S, M, L' },
        { id: 2, name: "Этническое Синее Кольцо", price: 200, image: `${BlueEtnicRing}`, recommended: true, color: 'Синий', style: 'Этнический', category: 'Кольца', description: 'Элегантное синее кольцо, воплощающее красоту и глубину океана. Его этнический стиль добавит загадочности вашему облику.', sizes: '6, 7, 8' },
        { id: 3, name: 'Роскошный Кармен', price: 1000, image: `${RedBracenet}`, color: 'Красный', style: 'Классический', category: 'Браслеты', recommended: true, description: 'Погружайтесь в мир роскоши с этим классическим красным браслетом. Его красота привлекает взгляды, а его изысканный дизайн подчеркивает вашу утонченность.', sizes: 'S, M, L' },
        { id: 4, name: 'Глубокий Сапфир', price: 1500, image: `${BlueCaplyaRing}`, color: 'Синий', style: 'Современный', category: 'Кольца', recommended: false, description: 'Это кольцо представляет собой смелое слияние современного стиля и глубокого синего оттенка. Оно выражает вашу уверенность и индивидуальность. ', sizes: '6, 7, 8' },
        { id: 5, name: 'Лесной Амулет', price: 500, image: `${GreenForestBracelet}`, color: 'Зеленый', style: 'Этнический', category: 'Брелоки', recommended: false, description: 'Этот зеленый брелок в этническом стиле добавит экзотики к вашему образу. Он не только прекрасно смотрится, но и приносит удачу, будучи вашим верным спутником.', sizes: 'N/A' },
        { id: 6, name: 'Солнечный Жемчуг', price: 2000, image: `${podsolnychiRing}`, color: 'Желтый', style: 'Классический', category: 'Броши', recommended: true, description: 'Эта яркая желтая брошь в классическом стиле призвана добавить изысканности вашему образу. Она является элегантным дополнением к вашему стилю и привлекает внимание своим блеском.', sizes: 'N/A' },
        { id: 7, name: 'Современный Экспресс', price: 3000, image: `${BlackExpress}`, color: 'Черный', style: 'Современный', category: 'Фигурки', recommended: false, description: 'Эта стильная черная фигурка приносит в ваш дом нотки современного искусства. Она выражает вашу творческую натуру и добавляет характера в ваш интерьер.', sizes: 'N/A' },
        { id: 8, name: 'Волшебный Лазурит', price: 1200, image: `${EtnicCulon}`, color: 'Голубой', style: 'Этнический', category: 'Кулоны', recommended: true, description: 'Этот голубой этнический кулон обладает особым очарованием. Он не только является символом гармонии и духовности, но и станет визитной карточкой вашего индивидуального стиля. ', sizes: 'N/A' },
        // Браслеты
        { id: 9,name: 'Браслет "Розовая Россыпь"', price: 1000, image: `${RedBracelet}`, color: 'Красный', style: 'Классический', category: 'Браслеты', recommended: true, description: 'Представьте себе, что ваша рука украшена лепестками нежных роз, плавно переходящими из одного оттенка в другой. Этот браслет - как россыпь цветов, создающая атмосферу весеннего вечера, наполненного ароматом любви и нежности.', sizes: 'S, M, L'},
        { id: 10,name: 'Браслет "Лазурный Вихрь"', price: 1100, image: `${BlueBraslet}`, color: 'Голубой', style: 'Современный', category: 'Браслеты', recommended: false, description: 'Погрузитесь в волшебный мир морских глубин с этим браслетом, напоминающим игру света на поверхности воды. Его голубые оттенки создают впечатление лазурного вихря, принося в вашу жизнь свежесть и чистоту океана.', sizes: 'S, M, L'},
        { id: 11,name: 'Браслет "Синяя Симфония"', price: 1200, image: '', color: 'Синий', style: 'Этнический', category: 'Браслеты', recommended: true, description: 'Этот браслет - это музыка синего неба и бескрайних просторов. Он переплетает оттенки глубокого небесного цвета, создавая симфонию красоты и гармонии, которая наполняет вашу жизнь волшебством и вдохновением.', sizes: 'S, M, L' },
        { id: 12,name: 'Браслет "Изумрудные Лианы"', price: 1300, image: `${GreenBlacelet}`, color: 'Зеленый', style: 'Классический', category: 'Браслеты', recommended: false, description: 'Представьте себе, что ваша рука окутана изумрудными листьями и ветвями, создавая образ изумрудного леса. Этот браслет - как лианы, таинственно обвивающие ваш запястье, принося капли свежести и жизни в ваш образ.', sizes: 'S, M, L' },
        { id: 13,name: 'Браслет "Черное Великолепие"', price: 1400, image: '', color: 'Черный', style: 'Современный', category: 'Браслеты', recommended: true, description: 'Этот браслет - это слияние таинственности и изысканности черного цвета. Он словно магнит притягивает внимание своей загадочной привлекательностью, создавая образ неповторимой элегантности и стиля. Он как черное великолепие, добавляющее таинственности и глубины вашему облику.', sizes: 'S, M, L' },
        // Кольца
        { id: 14,name: 'Кольцо "Лазурное Сияние"', price: 1500, image: `${BlueSea}`, color: 'Синий', style: 'Современный', category: 'Кольца', recommended: false,description: 'Это кольцо вдохновлено сиянием голубого неба в лучах солнца. Оно словно украшение, напоминающее о бескрайних просторах неба, принося радость и свет вашему образу.', sizes: '6, 7, 8' },
        { id: 15,name: 'Кольцо "Пылающий Карнавал"', price: 1600, image: '', color: 'Красный', style: 'Этнический', category: 'Кольца', recommended: true, description: 'Это кольцо напоминает пылающие красные огни на ярком карнавале. Его насыщенный красный цвет привлекает внимание и придает вашему образу дерзкость и страсть.', sizes: '6, 7, 8' },
        { id: 16,name: 'Кольцо "Золотая Гармония"', price: 1700, image: '', color: 'Желтый', style: 'Классический', category: 'Кольца', recommended: false, description: 'Это кольцо излучает тепло и свет желтого золота, словно приглашая вас на уютный закат. Оно добавляет вашему образу изысканности и стиля, принося в него нотки утонченной элегантности.', sizes: '6, 7, 8' },
        { id: 17,name: 'Кольцо "Волшебный Ирис"', price: 1800, image: '', color: 'Голубой', style: 'Современный', category: 'Кольца', recommended: true,description: 'Это кольцо воплощает в себе нежность и таинственность голубых ирисов. Его голубой цвет придает образу загадочности и привлекательности, словно ведя вас в мир фантазии и волшебства.', sizes: '6, 7, 8' },
        { id: 18,name: 'Кольцо "Черное Великолепие"', price: 1900, image: '', color: 'Черный', style: 'Этнический', category: 'Кольца', recommended: false,description: 'Это кольцо олицетворяет глубокую тайну и изысканность черного цвета. Оно как темная ночь, полная загадок и непредсказуемости, принося в ваш образ нотки интриги и элегантности.', sizes: '6, 7, 8' },
        // Брелоки
        { id: 19,name: 'Брелок 1', price: 500, image: '', color: 'Зеленый', style: 'Этнический', category: 'Брелоки', recommended: false, description: 'Зеленый брелок в этническом стиле.', sizes: 'N/A' },
        { id: 20,name: 'Брелок 2', price: 600, image: '', color: 'Красный', style: 'Классический', category: 'Брелоки', recommended: true,description: 'Зеленый брелок в этническом стиле.', sizes: 'N/A' },
        { id: 21,name: 'Брелок 3', price: 700, image: '', color: 'Желтый', style: 'Современный', category: 'Брелоки', recommended: false, description: 'Зеленый брелок в этническом стиле.', sizes: 'N/A' },
        { id: 22,name: 'Брелок 4', price: 800, image: '', color: 'Голубой', style: 'Этнический', category: 'Брелоки', recommended: true, description: 'Зеленый брелок в этническом стиле.', sizes: 'N/A' },
        { id: 23,name: 'Брелок 5', price: 900, image: '', color: 'Черный', style: 'Классический', category: 'Брелоки', recommended: false, description: 'Зеленый брелок в этническом стиле.', sizes: 'N/A' },
        // Броши
        { id: 24,name: 'Брошь 1', price: 2000, image: '', color: 'Желтый', style: 'Классический', category: 'Броши', recommended: true, description: 'Желтая брошь в классическом стиле.', sizes: 'N/A' },
        { id: 25,name: 'Брошь 2', price: 2100, image: `${BlueBrosh}`, color: 'Голубой', style: 'Современный', category: 'Броши', recommended: false,description: 'Желтая брошь в классическом стиле.', sizes: 'N/A' },
        { id: 26,name: 'Брошь 3', price: 2200, image: '', color: 'Синий', style: 'Этнический', category: 'Броши', recommended: true,description: 'Желтая брошь в классическом стиле.', sizes: 'N/A' },
        { id: 27,name: 'Брошь 4', price: 2300, image: '', color: 'Зеленый', style: 'Классический', category: 'Броши', recommended: false,description: 'Желтая брошь в классическом стиле.', sizes: 'N/A' },
        { id: 28,name: 'Брошь 5', price: 2400, image: '', color: 'Черный', style: 'Современный', category: 'Броши', recommended: true,description: 'Желтая брошь в классическом стиле.', sizes: 'N/A' },
        // Фигурки
        { id: 29,name: 'Фигурка 1', price: 3000, image: `${BatFly}`, color: 'Черный', style: 'Современный', category: 'Фигурки', recommended: false, description: 'Современная черная фигурка.', sizes: 'N/A' },
        { id: 30,name: 'Фигурка 2', price: 3100, image: '', color: 'Красный', style: 'Классический', category: 'Фигурки', recommended: true,description: 'Современная черная фигурка.', sizes: 'N/A' },
        { id: 31,name: 'Фигурка 3', price: 3200, image: '', color: 'Желтый', style: 'Современный', category: 'Фигурки', recommended: false,description: 'Современная черная фигурка.', sizes: 'N/A' },
        { id: 32,name: 'Фигурка 4', price: 3300, image: '', color: 'Голубой', style: 'Этнический', category: 'Фигурки', recommended: true,description: 'Современная черная фигурка.', sizes: 'N/A' },
        { id: 33,name: 'Фигурка 5', price: 3400, image: '', color: 'Черный', style: 'Классический', category: 'Фигурки', recommended: false,description: 'Современная черная фигурка.', sizes: 'N/A' },
        // Кулоны
        { id: 34,name: 'Кулон 1', price: 1200, image: '', color: 'Голубой', style: 'Этнический', category: 'Кулоны', recommended: true,description: 'Этнический голубой кулон.', sizes: 'N/A'  },
        { id: 35,name: 'Кулон 2', price: 1300, image: '', color: 'Синий', style: 'Современный', category: 'Кулоны', recommended: false,description: 'Этнический голубой кулон.', sizes: 'N/A' },
        { id: 36,name: 'Кулон 3', price: 1400, image: '', color: 'Зеленый', style: 'Классический', category: 'Кулоны', recommended: true,description: 'Этнический голубой кулон.', sizes: 'N/A' },
        { id: 37,name: 'Кулон 4', price: 1500, image: '', color: 'Красный', style: 'Этнический', category: 'Кулоны', recommended: false,description: 'Этнический голубой кулон.', sizes: 'N/A' },
        { id: 38,name: 'Кулон 5', price: 1600, image: '', color: 'Желтый', style: 'Современный', category: 'Кулоны', recommended: true,description: 'Этнический голубой кулон.', sizes: 'N/A' }
        ];
      orders: Order[] = [];
      categories: string[] = ['Браслеты', 'Кольца', 'Брелоки', 'Броши', 'Фигурки', 'Кулоны'];
        colors: string[] = ['Желтый', 'Голубой', 'Синий', 'Зеленый', 'Коричневый', 'Черный', 'Оранжевый', 'Бежевый', 'Красный', 'Фиолетовый', 'Бирюзовый', 'Белый'];
    
      constructor() {
        makeAutoObservable(this);
      }
    
      addProduct(product: Omit<Product, 'id'>) {
        this.products.push({ ...product, id: Date.now() });
      }
    
      updateProduct(updatedProduct: Product) {
        this.products = this.products.map(product =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
      }
    
      deleteProduct(id: number) {
        this.products = this.products.filter((product) => product.id !== id);
      }
      addOrder(order: Omit<Order, 'id'>) {
        this.orders.push({ ...order, id: Date.now() });
    }
    }
  