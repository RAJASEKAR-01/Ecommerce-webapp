import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from './Components/Navbar/Navbar';
import Home from './Pages/Home';
import Categories from './Pages/Categories';
import Deals from './Pages/Deals';
import Cart from './Pages/Cart';
import ProductDescription from './Pages/ProductDescription';
import LoginSignup from './Pages/LoginSignup';
import { CartProvider } from './context/CartContext';
import Checkoutpage from './Pages/Checkoutpage';
import Footer from './Components/Footer/Footer';




function App() {
  return (
    <div>
       <CartProvider> {/* ✅ Wrap the entire app */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Categories" element={<Categories />} />
          <Route path="/product/:id" element={<ProductDescription />} />
          <Route path="/Deals" element={<Deals />} />
          <Route path="/Login" element={<LoginSignup />} />
          <Route path="/Order/Checkout" element={<Checkoutpage />} />
         
        </Routes>
      </BrowserRouter>
      <Footer />
    </CartProvider>
    </div>
  );
}

export default App;
