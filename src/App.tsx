import React from 'react';
import Footer from './components/Base/Footer';
import Header from './components/Base/Header';
import AppRoutes from './routes/Index';

const App = () => (
    <div className="App h-100 d-flex flex-column">
        <Header />
        <div className="flex-grow-1">
            <AppRoutes />
        </div>
        <Footer />
    </div>
);

export default App;
