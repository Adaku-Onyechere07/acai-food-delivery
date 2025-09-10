import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home/'
import Cart from './pages/Cart/Cart/'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder/'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/verify/Verify'
import MyOrders from './pages/myOrders/MyOrders'

const App = () => {

  const [showLogin,setShowLogin] = useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/order' element={<PlaceOrder/>} />
          <Route path='/verify?' element={<Verify/>} />
          <Route path='/myorders' element={<MyOrders/>} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
