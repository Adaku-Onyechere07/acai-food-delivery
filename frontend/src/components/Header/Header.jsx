import React, { useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {

  const [menu,setMenu] = useState("home")

  return (
    <div className="header">
      <div className="header-contents">
        <h2>The place to order your favorite food</h2>
        <p>Bringing your favorite meals straight to your doorstep. Order your favorite meals and enjoy fast delivery today.</p>
        <a href="#explore-menu">
          <button onClick={() => setMenu("menu")}>View Menu</button>
        </a>     
      </div>
    </div>
  )
}

export default Header
