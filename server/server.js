import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import { dbConnection } from './configs/db.js';
import { userRouter } from './routes/UserRoute.js';
import { sellerRouter } from './routes/SellerRoute.js';
import { connectCloudinary } from './configs/cloudinary.js';
import { productRouter } from './routes/productRoute.js';
import { cartRouter } from './routes/cartRoute.js';
import { addressRouter } from './routes/addressRoute.js';
import { orderRouter } from './routes/orderRoute.js';

const app=express();
const port=process.env.PORT || 8000;
await dbConnection();
await connectCloudinary();
// Allow multiple origins
const allowedOrigins=['http://localhost:5173','https://freshkart-seven.vercel.app']

//Middleware Configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials:true}));

app.get('/',(req,res)=> res.send('Api is working'));
app.use('/api/user',userRouter);

app.use('/api/seller',sellerRouter);

app.use('/api/product',productRouter);

app.use('/api/cart', cartRouter);

app.use('/api/address', addressRouter);

app.use('/api/order', orderRouter);




app.listen(port,'localhost',()=>{
    console.log('server started at http://localhost:8000');
})