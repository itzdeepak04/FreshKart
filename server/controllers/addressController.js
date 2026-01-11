import { ADDRESS } from "../models/Address.js";

//Add Address : /api/address/add
export async function addAddress(req, res) {
    try {
        const { address} = req.body;
        const {userId}=req;
        await ADDRESS.create({ ...address, userId });
        return res.json({ status: true, message: 'Address added successfully' })
    } catch (error) {
        console.log(error.message);
        return res.json({ status: false, message: error.message });
    }
}

//Get Address : /api/address/get

export async function getAddress(req, res) {
    try {
        const { userId } = req;
        const addresses = await ADDRESS.find({ userId });
        return res.json({ status: true, addresses });
    } catch (error) {
        console.log(error.message);
        return res.json({ status: false, message: error.message });
    }
}