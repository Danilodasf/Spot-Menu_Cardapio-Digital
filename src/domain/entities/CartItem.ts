// Interface que representa um item dentro do carrinho de compras
import { Product } from './Product';

export interface CartItem {
  product: Product;    // Produto adicionado ao carrinho
  quantity: number;    // Quantidade selecionada pelo usuário
}

