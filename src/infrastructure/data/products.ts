// Base de dados de produtos da hamburgueria
import { Product } from '@/domain/entities/Product';

export const products: Product[] = [
  // Hambúrguers
  {
    id: '1',
    name: 'X-Tudo Especial',
    description: 'Hambúrguer, queijo, presunto, bacon, ovo, alface, tomate e molho especial',
    price: 32.90,
    category: 'comida',
    image: '/images/x_tudo_especial.webp'
  },
  {
    id: '2',
    name: 'X-Bacon Cheddar',
    description: 'Hambúrguer artesanal 180g, bacon crocante, cheddar cremoso e cebola caramelizada',
    price: 28.90,
    category: 'comida',
    image: '/images/x_bacon_cheddar.webp'
  },
  {
    id: '3',
    name: 'Smash Burger Duplo',
    description: 'Dois hambúrgueres smash 100g, queijo americano, picles e molho da casa',
    price: 35.90,
    category: 'comida',
    image: '/images/smash_burguer_duplo.webp'
  },
  {
    id: '4',
    name: 'X-Calabresa',
    description: 'Hambúrguer bovino, calabresa acebolada, queijo mussarela e pimenta',
    price: 29.90,
    category: 'comida',
    image: '/images/x_calabresa.png'
  },
  {
    id: '5',
    name: 'X-Frango Catupiry',
    description: 'Filé de frango grelhado, catupiry, alface, tomate e molho de ervas',
    price: 26.90,
    category: 'comida',
    image: '/images/x_frango_catupiry.jpg'
  },
  {
    id: '6',
    name: 'X-Salada Fit',
    description: 'Hambúrguer de carne magra, queijo branco, alface, tomate, cenoura e molho light',
    price: 27.90,
    category: 'comida',
    image: '/images/x_salada.jpg'
  },
  // Bebidas
  {
    id: '7',
    name: 'Milkshake de Ovomaltine',
    description: 'Milkshake cremoso de Ovomaltine com chantilly e cobertura crocante',
    price: 15.90,
    category: 'bebida',
    image: '/images/milkshake_ovomaltine.jpg'
  },
  {
    id: '8',
    name: 'Refrigerante Lata',
    description: 'Coca-Cola, Guaraná ou Fanta Laranja - 350ml gelado',
    price: 6.90,
    category: 'bebida',
    image: '/images/refri_lata.jpg'
  },
  {
    id: '9',
    name: 'Suco Natural Laranja',
    description: 'Suco de laranja natural espremido na hora - 500ml',
    price: 10.90,
    category: 'bebida',
    image: '/images/suco_natural_laranja.jpg'
  },
  {
    id: '10',
    name: 'Limonada Suíça',
    description: 'Limonada refrescante com leite condensado e limão siciliano',
    price: 12.90,
    category: 'bebida',
    image: '/images/limonada_suica.jpg'
  }
];
