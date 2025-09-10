import { createContext, useEffect, useState } from "react";
import { menu_list,assets } from "../assets";
import FoodDisplay from "../components/FoodDisplay/FoodDisplay";
import axios from 'axios';

export const StoreContext = createContext({
    menu_list: [],
    assets: {}
})
const StoreContextProvider = (props) => {

    const [cartItems,setCartItems] = useState({});
    const url = "https://acai-food-delivery.vercel.app";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([])

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else {
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount = () => {
    let totalAmount = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) { 
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount*1500;
    }

    const fetchFoodList = async ()=>{
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data)
    }

    const loadCartData = async (token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData);
    }

    useEffect(()=>{
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();
    },[])

    const contextValue = {
        food_list,
        menu_list,
        assets,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
                {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider
