import jwt from 'jsonwebtoken'
import { config } from "dotenv";
config();
export async function sellerLogin(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ status: false, message: 'Missing Details' })
        }

        if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {
            const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '7d' });
            res.cookie('sellerToken', token,
                {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                }
            );
            return res.json({ status: true, message: 'Logged In' });
        }
        else {
            return res.json({ status: false, message: 'Invalid Credentials' });
        }
    } catch (error) {
            console.log(error.message);
            return res.json({ status: false, message: error.message });
    }
}


export async function isSellerAuth(req, res) {
    try {
        return res.json({ status: true});
    } catch (error) {
        console.log(error.message);
        return res.json({ status: false, message: error.message });
    }
}

export async function sellerLogout(req, res) {
    try {
        res.clearCookie('sellerToken',
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            }
        );
        return res.json({ status: true, message: 'Logged out' })
    } catch (error) {
        console.log(error.message);
        return res.json({ status: false, message: error.message });
    }
}