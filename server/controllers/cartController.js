import { USER } from "../models/User.js";

//Update User CartData: api/cart/update
export async function updateCart(req,res)
{
    try {
        const {cartItems}=req.body;
        const {userId}=req;
        await USER.findByIdAndUpdate(userId, {cartItems});
        return res.json({status:true, message:'Cart updated'});
        
    } catch (error) {
        console.log(error.message);
        return res.json({status:false, message:error.message});
        
    }
}