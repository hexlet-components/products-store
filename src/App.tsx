import React from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AppRoutes from './routes/Index';

const App = () => (
    <div className="App">
      <Header />
      <AppRoutes />
      <Footer />
    </div>
);

export default App;
