import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
const AppContext = createContext();

export function AppContextWrapper({ children }) {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);

    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState('');


    // Seller Status
    async function fetchSeller() {
        try {
            const { data } = await axios.get('/api/seller/is-auth');
            if (data.status) {
                setIsSeller(true);
            }
            else {
                setIsSeller(false);
            }
        } catch (error) {
            setIsSeller(false);
        }
    }

    // USer status, User data and cartItems
    async function fetchUser()
    {
        try {
            const {data}=await axios.get('/api/user/is-auth');
            if(data.status)
            {
                setUser(data.user);
                setCartItems(data.user.cartItems);
            }
        } catch (error) {
            setUser(null);
        }
    }



    //Fetching Products
    async function fetchProducts() {
        try {
            const {data}= await axios.get('/api/product/list');
            if(data.status)
            {
                setProducts(data.products)
            }
            else
            {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // Add Products to cart
    function addToCart(itemId) {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }
        else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success('Added to cart')
    }

    //Update Cart
    function updateCartItem(itemId, quantity) {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success('Cart Updated');
    }

    // Remove from Cart
    function removeFromCart(itemId) {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        toast.success('Removed from cart');
        setCartItems(cartData);
    }

    useEffect(() => {
        fetchSeller();
        fetchUser();
        fetchProducts();
    }, []);

    //Update cartItem in Database

    useEffect(()=>{
           async function updateCart()
    {
        try {
            const {data}=await axios.post('/api/cart/update', {cartItems});
            if(!data.status)
            {
                toast.error(data.message);
            }
            else
            {
                toast.error(error.message);
            }
        } catch (error) {
            
        }
    }
    if(user)
    {
        updateCart();
    }

    },[cartItems])


    //Cart Count
    function getCartCount() {
        let totalCount = 0;
        for (let item in cartItems) {
            totalCount += cartItems[item];
        }
        return totalCount;
    }

    // Cart Total
    function getCartAmount() {
        let totalAmount = 0;
        for (let items in cartItems) {
            let itemInfo = products.find(prod => prod._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo?.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }
    const value = { navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products, currency, cartItems,setCartItems, addToCart, updateCartItem, removeFromCart, searchQuery, setSearchQuery, getCartCount, getCartAmount, axios, fetchProducts };
    return (

        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext);
}