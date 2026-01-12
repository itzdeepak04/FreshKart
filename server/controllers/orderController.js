


import { ORDER } from "../models/Order.js";
import { PRODUCT } from "../models/Product.js";

//  Place Order COD : /api/order/cod
export async function placeOrderCOD(req, res) {
    try {
        const { userId, items, address } = req.body;
        if (!address || !userId || !items || items.length === 0) {
            return res.json({ status: false, message: 'Invalid order Data' })
        }
        //Calculate Amount using items
        let amount = 0;

        for (const item of items) {
            const product = await PRODUCT.findById(item.product);
            if (!product) continue;
            amount += product.offerPrice * item.quantity;
        }

        // Add Tax charge 2%
        amount += Math.floor(amount * 0.02);

        await ORDER.create({ userId, items, amount, address, paymentType: 'COD' });
        return res.json({ status: true, message: 'Order placed Successfully' })
    } catch (error) {
        console.log(error.message);
        return res.json({ status: false, message: error.message });


    }
}

// Get orders by User ID: /api/order/user

export async function getUserOrders(req, res) {
    try {
        const { userId } = req;

        const orders = await ORDER
            .find({
                userId,
                $or: [{ paymentType: 'COD' }, { isPaid: true }]
            })
            .populate('items.product address')
            .sort({ createdAt: -1 }); // ✅ moved here

        return res.json({ status: true, orders });
    } catch (error) {
        console.log(error.message);
        return res.json({ status: false, message: error.message });
    }
}


// Get All Orders(Admin) : /api/order/seller

export async function getAllOrders(req, res) {
    try {
        const orders = await ORDER
            .find({ $or: [{ paymentType: 'COD' }, { isPaid: true }] })
            .populate('items.product address')
            .sort({ createdAt: -1 });

        return res.json({ status: true, orders });
    } catch (error) {
        console.log(error.message);
        return res.json({ status: false, message: error.message });
    }
}



// let amount = await items.reduce(async(acc,item)=>{
//     const product=await PRODUCT.findById(item.product);
//     return (await acc)+ product.offerPrice * item.quantity;
// }, 0);