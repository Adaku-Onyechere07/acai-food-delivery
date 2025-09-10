import userModel from "../models/userModel.js"

//add items to cart
const addToCart = async (req,res)=>{
    try {
        let userData = await userModel.findById(req.userId);
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) 
        {
            cartData[req.body.itemId] = 1
        }else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.userId, {cartData});
        res.json({success:true, message:"Added to Cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error adding to Cart"})
    }
}

//remove items from cart
const removeFromCart = async (req,res)=>{
    try {
        let userData = await userModel.findById(req.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.userId, {cartData});
        res.json({success: true, message:"Removed from Cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error removing from cart"})
    }
}

//fetch cart data
const getCart = async (req,res)=>{
    try {
        let userData = await userModel.findById(req.userId);
        let cartData = await userData.cartData;
        res.json({success: true, cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error getting cart"})
    }
}

export {addToCart,removeFromCart,getCart}