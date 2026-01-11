import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
export async function authUser(req,res,next)
{
    const {token}=req.cookies;
    if(!token)
    {
        return res.json({status:false, message:'Not Authorized'});
    }
    try {
        const payload=jwt.verify(token,process.env.SECRET_KEY);
        const {id}=payload;
        if(id)
        {
            req.userId=id;
        }
        else
        {
            return res.json({status:false, message:'Not Authorized'});
        }
        next();
    } catch (error) {
        console.log(error.message);
        return res.json({status:false, message:error.message});
    }
}