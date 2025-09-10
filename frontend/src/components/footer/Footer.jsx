import React from 'react'
import './Footer.css'
import { assets } from '../../assets'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img id='footer-logo' src={assets.logo} alt="" />
                <p>Delicious food from your favorite local restaurants, delivered fast to your door. Order now and enjoy restaurant-quality meals in minutes.</p>
                <div className='footer-social-icons'>
                    <img id='facebook' src={assets.facebook_icon} alt="" />
                    <img id='twitter' src={assets.twitter_icon} alt="" />
                    <img id='linkedin' src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+234 810 993 4735</li>
                    <li>contact@acai.com</li>
                </ul>
            </div> 
       </div>
        <hr />
        <p className="footer-copyright">© 2025 Acai. All rights reserved.</p>
    </div>
  )
}

export default Footer
