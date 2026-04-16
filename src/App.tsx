import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Contacts from './pages/Contacts'
import Profile from './pages/Profile'

function NavLinks() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>🏠 Главная</Link>
      <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>📖 О компании</Link>
      <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>📦 Товары</Link>
      <Link to="/contacts" className={location.pathname === '/contacts' ? 'active' : ''}>📞 Контакты</Link>
      <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>👤 Профиль</Link>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <NavLinks />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;