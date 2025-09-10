import express, { response } from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoutes.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"



// app config
const app = express()
const port = process.env.PORT || 4000

//middleware
app.use(express.json())
app.use(cors({
  origin: "https://acai-food-delivery-1.vercel.app", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
    }
))

//db connection
connectDB();

//api endpoint
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})
app.get("/images/:public_id", (req, res) => {
    const imageUrl = cloudinary.url(req.params.public_id);
    res.redirect(imageUrl);
});

export default app;

