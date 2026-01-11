import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
export async function authSeller(req, res, next) {
    const { sellerToken } = req.cookies;
    if (!sellerToken) {
        return res.json({ status: false, message: 'Not Authorized' });
    }

    try {
        const payload = jwt.verify(sellerToken, process.env.SECRET_KEY);
        const { email } = payload;
        if (email === process.env.SELLER_EMAIL) {
            next();
        }
        else {
            return res.json({ status: false, message: 'Not Authorized' });
        }
    } catch (error) {
        console.log(error.message);
        return res.json({ status: false, message: error.message });
    }
}