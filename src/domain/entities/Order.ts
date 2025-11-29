// Interface que define a estrutura de um pedido finalizado
import { CartItem } from './CartItem';

export interface Order {
  id: string;                // Identificador único do pedido
  items: CartItem[];         // Lista de itens do pedido
  customerName: string;      // Nome completo do cliente
  customerPhone: string;     // Telefone para contato
  customerAddress: string;   // Endereço de entrega
  total: number;            // Valor total do pedido
  date: Date;               // Data e hora do pedido
}

