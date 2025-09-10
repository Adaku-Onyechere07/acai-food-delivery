import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://aonyechere2301533:AdakuEche12@cluster0.hdhvysv.mongodb.net/food-delivery').then(()=>console.log('DB Connected'));
}