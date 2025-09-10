import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);
const [data,setData] = useState({
  first_name:"",
  last_name:"",
  email:"",
  street:"",
  city:"",
  state:"",
  zipcode:"",
  country:"",
  phone:""
})

const onChangeHandler = (event) =>{
  const name = event.target.name;
  const value = event.target.value;
  setData(data=>({...data,[name]:value}))
}

const placeOrder = async (event)=>{
  event.preventDefault();
  let orderItems = [];
  food_list.map((item)=>{
      if (cartItems[item._id]) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
  })
  let orderData = {
    address:data,
    items:orderItems,
    amount:getTotalCartAmount()+2
  }
  let response = await axios.post(url+'/api/order/placeorder',orderData,{headers:{token}});
  if (response.data.success) {
    const {session_url} = response.data;
    window.location.replace(session_url);
  }else{
    alert("Error")
  } 
}

const navigate = useNavigate();

useEffect(()=>{
  if (!token) {
    navigate("/cart")
  }else if (!token && getTotalCartAmount()===0) {
    navigate("/cart")
  }
},[token])

  return (
    <div>
      <form onSubmit={placeOrder} className='place-order'>
        <div className="place-order-left">
            <p className='title'>Delivery Information</p>
            <div className="multi-fields">
              <input name='first_name' onChange={onChangeHandler} value={data.first_name} type="text" placeholder='First Name' required/>
              <input name='last_name' onChange={onChangeHandler} value={data.last_name} type="text" placeholder='Last Name' required/>
            </div>
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Adrress' required/>
            <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required/>
            <div className="multi-fields">
              <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required/>
              <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' required/>
            </div>
            <div className="multi-fields">
              <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' required/>
              <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' required/>
            </div>
            <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' required/>
        </div>
        <div className="place-order-right">
            <div className="cart-total">
              <h2>Cart Total</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>₦ {(getTotalCartAmount()).toLocaleString()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>₦ {(getTotalCartAmount()===0?0:2).toLocaleString()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>₦ {(getTotalCartAmount()===0?0:getTotalCartAmount()+2).toLocaleString()}</b>
                </div>
              </div>
              <button onClick={()=>navigate('/order')}>Proceed To Payment</button>
            </div>
            <div className="cart-promocode">
              <div>
                <p>If you have a promocode, enter it here</p>
                <div className="cart-promocode-input">
                  <input type="text" placeholder='promo code'/>
                  <button type='submit'>Submit</button>
                </div>
              </div>
            </div>
        </div>
      </form>
    </div>
  )
}

export default PlaceOrder