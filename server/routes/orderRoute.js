import express from 'express';
import { authSeller } from '../middlewares/authSeller.js';
import { getAllOrders, getUserOrders, placeOrderCOD } from '../controllers/orderController.js';
import { authUser } from '../middlewares/authUser.js';

export const orderRouter=express.Router();

orderRouter.post('/cod',authUser, placeOrderCOD);
orderRouter.get('/user',authUser, getUserOrders);
orderRouter.get('/seller',authSeller, getAllOrders);