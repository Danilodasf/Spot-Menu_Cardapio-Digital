// Interface que define a estrutura de um produto no sistema
export interface Product {
  id: string;                          // Identificador único do produto
  name: string;                        // Nome do produto
  description: string;                 // Descrição detalhada
  price: number;                       // Preço em reais
  category: 'comida' | 'bebida';      // Categoria do produto
  image: string;                       // Caminho da imagem
}

