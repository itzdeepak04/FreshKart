import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext.jsx';
import toast from 'react-hot-toast';

//Input field  Component
function InputField({ type, placeholder, name, handleChange, address }) {
    return (
        <input className='w-full px-2 py-2.5 border border-gray-500/30  rounded outline-none text-gray-500 focus:border-primary transition'
            type={type} placeholder={placeholder} value={address[name]} name={name} onChange={handleChange} required />
    )
}
function AddAddress() {
    const {axios, user, navigate}= useAppContext();
    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''

    });

    function handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        setAddress(prev =>({ ...prev, [name]: value }));
    }
    async function onSubmitHandler(e) {
        try {
            e.preventDefault();
            const {data}=await axios.post('/api/address/add', {address});
            if(data.status)
            {
                toast.success(data.message);
                navigate('/cart');
            }
            else
            {
                toast.error(data.message);
            }
            
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        if(!user)
        {
            toast.error('Please login to add address')
            navigate('/cart')
        }
    },[])
    return (
        <div className='mt-30 pb-16'>
            <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping <span className='font-semibold text-primary'>Address</span> </p>
            <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
                <div className='flex-1 max-w-md'>
                    <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>
                        <div className='grid grid-cols-2 gap-4'>
                            <InputField type='text' handleChange={handleChange} address={address.firstName} placeholder='First Name' name='firstName' />
                            <InputField type='text' handleChange={handleChange} address={address.lastName} placeholder='Last Name' name='lastName' />
                        </div>

                        <InputField type='email' handleChange={handleChange} address={address.email} placeholder='Email Address' name='email' />
                        <InputField type='text' handleChange={handleChange} address={address.street} placeholder='Street' name='street' />

                        <div className='grid grid-cols-2 gap-4'>
                            <InputField type='text' handleChange={handleChange} address={address.city} placeholder='City' name='city' />
                            <InputField type='text' handleChange={handleChange} address={address.state} placeholder='State' name='state' />
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <InputField type='number' handleChange={handleChange} address={address.zipcode} placeholder='Zipcode' name='zipcode' />
                            <InputField type='text' handleChange={handleChange} address={address.country} placeholder='Country' name='country' />
                        </div>
                        <InputField type='phone' handleChange={handleChange} address={address.phone} placeholder='Phone' name='phone' />
                        <button className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>Save Address</button>
                    </form>
                </div>
                <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt="Add Address" />
            </div>
        </div>
    )
}

export default AddAddress