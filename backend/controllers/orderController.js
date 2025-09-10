import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing users order from frontend
const placeOrder = async (req,res) =>{

    const frontend_url = 'http://localhost:5173';

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"ngn",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*1500
            },
            quantity:item.quantity
        }))
        line_items.push({
            price_data:{
                currency:"ngn",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*1500
            },
            quantity:1
        })
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
        res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error placing order"})
    }
}

const verifyOrder = async (req,res)=>{
    const {orderId,success}=req.body;
    try {
        if (success=="true") {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true, message:"Paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:true, message:"Not paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:true, message:"Error Verifying order"})
    }
}

//user orders for frontend
const userOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({userId:req.userId})
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error getting user's orders"})
    }
}

//find all orders for all users
const listOrders = async (req,res)=>{
    try {
        const orders = await orderModel.find({});
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error listing users' orders"})
    }
}
//api for updating order status
const updateStatus = async(req,res) =>{
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId,{status:status});
        res.json({success:true, message:"Status updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error updating"})
    }
}

export {placeOrder, verifyOrder,userOrders,listOrders,updateStatus};