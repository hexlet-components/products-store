import React from 'react'
import Footer from './components/Base/Footer'
import Header from './components/Base/Header'
import AppRoutes from './routes/Index'

const App = () => (
  <div className="App">
    <Header />

    <AppRoutes />

    <Footer />
  </div>
)

export default App
