import { USER } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { config } from "dotenv";
config();

const secretKey = process.env.SECRET_KEY;
//Register User
export async function register(req, res) {
    try {

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ status: false, message: 'Missing Details' });
        }
        const isUser = await USER.findOne({ email });
        if (isUser) {
            return res.json({ status: false, message: 'User with this email already exist' });
        }
        const hassPass = await bcrypt.hash(password, 10);

        let user = await USER.create({ email, name, password: hassPass });
        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,// Prevent JavaScript to access cookie
            secure: process.env.NODE_ENV === 'production', //Use secure cookie in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, //Cookie expires in
        });
        return res.json({ status: true, message: 'User Acount Created Successfully', user: { email: user.email, name: user.name } });



    } catch (error) {
        console.log(error.message)
        return res.json({ status: false, message: error.message });
    }
}

export async function login(req, res) {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ status: false, message: 'Missing Details' });
        }
        const isUser = await USER.findOne({ email });
        if (!isUser) {
            return res.json({ status: false, message: 'Invalid Email' });
        }
        const isMatching = await bcrypt.compare(password, isUser.password);
        if (!isMatching) {
            return res.json({ status: false, message: 'Invalid Password' });
        }

        const token = jwt.sign({ id: isUser._id }, secretKey, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({ status: true, message: 'User logged in successfull', user: { email: isUser.email, name: isUser.name } });
    } catch (error) {
        console.log(error.message)
        return res.json({ status: false, message: error.message });
    }
}

//Check Auth /api/user/is-auth

export async function isAuth(req, res) {
    try {
        const userId = req.userId;
        const user = await USER.findById(userId).select("-password");
        return res.json({ status: true, user });
    } catch (error) {
        console.log(error.message);
        return res.json({ status: false, message: error.message });
    }
}

//Logout User

export async function logout(req, res) {
    try {
        res.clearCookie('token',
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