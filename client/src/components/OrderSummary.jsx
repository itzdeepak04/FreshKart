import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import toast from "react-hot-toast";
function OrderSummary({ cartArray }) {
    const { currency, getCartAmount, axios, user, navigate,setCartItems } = useAppContext();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddress, setShowAddress] = useState(false);
    const [loading, setLoading] = useState(false);


    async function placeOrder() {
        if (loading) return;
        setLoading(true);
        try {
            if (!selectedAddress) {
                toast.error('Please select an address');
                setLoading(false);
                return;
            }

            //COD
            const { data } = await axios.post('/api/order/cod', { userId: user?._id, items: cartArray?.map(item => ({ product: item._id, quantity: item.quantity })), address: selectedAddress._id });
            if (data.status) {
                toast.success(data.message);
                setCartItems({});
                navigate('/my-orders')
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }

    }

    async function getUserAddress() {
        try {
            const { data } = await axios.get('/api/address/get');
            if (data.status) {
                setAddresses(data.addresses);
                if (data.addresses.length > 0) {
                    setSelectedAddress(data.addresses[0]);
                }
            }
            else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (user) {
            getUserAddress();
        }
    }, [user])

    useEffect(() => {
        const close = () => setShowAddress(false);
        if (showAddress) document.addEventListener('click', close);
        return () => document.removeEventListener('click', close);
    }, [showAddress]);
    return (
        <div className="max-w-90 w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
            <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
            <hr className="border-gray-300 my-5" />

            <div className="mb-6">
                <p className="text-sm font-medium uppercase">Delivery Address</p>
                <div className="relative flex justify-between items-start mt-2">
                    <p className="text-gray-500">{selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}` : 'No address found'}</p>
                    <button onClick={(e) => { e.stopPropagation(); setShowAddress(prev => !prev) }} className="text-primary hover:underline cursor-pointer">
                        Change
                    </button>
                    {showAddress && (
                        <div onClick={(e) => e.stopPropagation()} className="absolute z-50 top-12 py-1 bg-white border text-sm w-full">
                            {addresses.map((address, ind) => (
                                <p key={ind} onClick={() => { setShowAddress(false); setSelectedAddress(address) }} className="text-gray-500 cursor-pointer p-2 hover:bg-gray-100">
                                    {address.street}, {address.city}, {address.state}, {address.country}
                                </p>


                            ))}

                            <p onClick={() => navigate('/add-address')} className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10">
                                Add address
                            </p>
                        </div>
                    )}
                </div>

                <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
                <p className="text-gray-600">Cash on Delivery</p>
            </div>

            <hr className="border-gray-300" />

            <div className="text-gray-500 mt-4 space-y-2">
                <p className="flex justify-between">
                    <span>Price</span><span>{currency}{getCartAmount()}</span>
                </p>


                <p className="flex justify-between">
                    <span>Shipping Fee</span><span className="text-green-600">{(getCartAmount() < 100 && cartArray.length > 0) ? '30' : 'Free'}</span>
                </p>


                <p className="flex justify-between">
                    <span>Tax (2%)</span><span>{currency} {getCartAmount() * 2 / 100}</span>
                </p>
                <p className="flex justify-between text-lg font-medium mt-3">
                    <span>Total Amount:</span><span>{currency} {(getCartAmount() < 100 && cartArray.length > 0) ? ((getCartAmount() + getCartAmount() * 2 / 100) + 30) : (getCartAmount() + getCartAmount() * 2 / 100)}</span>
                </p>
            </div>

            <button type="button" onClick={placeOrder} className="w-full py-3 mt-6 bg-primary text-white font-medium cursor-pointer hover:bg-primary-dull transition">
                {loading ? 'Placing Order' : 'Place Order'}
            </button>
        </div>
    )
}

export default OrderSummary;