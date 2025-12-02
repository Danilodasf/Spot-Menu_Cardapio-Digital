// Componente raiz da aplicação com configuração de rotas e contextos
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/application/contexts/CartContext';
import { Header } from '@/presentation/components/Header/Header';
import { Menu } from '@/presentation/pages/Menu/Menu';
import { Cart } from '@/presentation/pages/Cart/Cart';
import { Checkout } from '@/presentation/pages/Checkout/Checkout';

function App() {
  return (
    // BrowserRouter habilita navegação entre páginas
    <BrowserRouter>
      {/* CartProvider fornece estado global do carrinho para toda aplicação */}
      <CartProvider>
        <div className="app">
          {/* Header fixo presente em todas as páginas */}
          <Header />
          <main>
            {/* Definição das rotas da aplicação */}
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/carrinho" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;

