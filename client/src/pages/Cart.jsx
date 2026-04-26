import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import OrderSummary from "../components/OrderSummary";
function Cart() {
    const { products, currency, cartItems, removeFromCart, getCartCount, updateCartItem, navigate, getCartAmount, axios, user, setCartItems } = useAppContext();
    const [cartArray, setCartArray] = useState([]);

    function getCart() {
        let tempArray = [];
        for (let key in cartItems) {
            let product = products.find(prod => prod._id === key);
            product.quantity = cartItems[key]
            tempArray.push(product);
        }
        setCartArray(tempArray);
    }

    useEffect(() => {
        if (products.length > 0 && cartItems) {
            getCart();
        }
    }, [products, cartItems]);

    return products.length > 0 && cartItems ? (
        <div className="flex flex-col md:flex-row mt-30">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-primary">{getCartCount()} Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div onClick={() => { navigate(`/products/${product?.category.toLowerCase()}/${product._id}`); scrollTo(0, 0) }} className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                                <img className="max-w-full h-full object-cover" src={product?.image[0]} alt={product.name} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    <p>Weight: <span>{product?.weight || "N/A"}</span></p>
                                    <div className='flex items-center'>
                                        <p>Qty:</p>
                                        <select onChange={(e) => updateCartItem(product._id, Number(e.target.value))} value={cartItems[product._id]} className='outline-none'>
                                            {Array(cartItems[product._id] > 9 ? cartItems[product._id] : 9).fill('').map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>
                        <button onClick={() => { removeFromCart(product._id) }} className="cursor-pointer mx-auto">
                            <img src={assets.remove_icon} alt="remove" className="inline-block w-6 h-6" />
                        </button>
                    </div>)
                )}

                <button onClick={() => { navigate('/products'); scrollTo(0, 0) }} className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium">
                    <img className="group-hover:-translate-x-1 transition" src={assets?.arrow_right_icon_colored} alt="arrow" />
                    Continue Shopping
                </button>

            </div>

            {/* ORDER SUMMARY */}
            <OrderSummary cartArray={cartArray}/>
        </div>
    ) : null
};
export default Cart;