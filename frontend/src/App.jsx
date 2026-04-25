import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="App">
          <AppRouter />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
