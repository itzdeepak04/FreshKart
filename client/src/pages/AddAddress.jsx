import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext.jsx';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema=Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().required('Required').email(),
    street: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    zipcode: Yup.number().required('Required'),
    country: Yup.string().required('Required'),
    phone: Yup.number().required('Required')
})
//Input field  Component
function InputField({ type, placeholder, name, formik}) {
    const {values,errors,touched,handleChange,handleBlur}=formik;
    return (<div>
        <input className={`w-full px-2 py-2.5 border ${touched[name]&& errors[name] ? 'border-red-500' : 'border-gray-500/30' }  rounded outline-none text-gray-500`}
            type={type} placeholder={placeholder} value={values[name]} name={name} onChange={handleChange} onBlur={handleBlur} />
            {(touched[name] && errors[name]) && <p className="text-red-500 text-sm z-50">{errors[name]}</p>}
        </div>
    )
}
function AddAddress() {
    const {axios, user, navigate}= useAppContext();
    const formik=useFormik({
        initialValues:{firstName: '',lastName: '',email: '',street: '',city: '',state: '',zipcode: '',country: '',phone: ''},
        validationSchema,
        onSubmit:onSubmitHandler
    })
    async function onSubmitHandler(values) {
        try {
            const {data}=await axios.post('/api/address/add', values);
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
                    <form onSubmit={formik.handleSubmit} className='space-y-3 mt-6 text-sm'>
                        <div className='grid grid-cols-2 gap-4'>
                            <InputField type='text' formik={formik} placeholder='First Name' name='firstName' />
                            <InputField type='text' formik={formik} placeholder='Last Name' name='lastName' />
                        </div>

                        <InputField type='email' formik={formik} placeholder='Email Address' name='email' />
                        <InputField type='text' formik={formik} placeholder='Street' name='street' />

                        <div className='grid grid-cols-2 gap-4'>
                            <InputField type='text' formik={formik} placeholder='City' name='city' />
                            <InputField type='text' formik={formik} placeholder='State' name='state' />
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <InputField type='number' formik={formik} placeholder='Zipcode' name='zipcode' />
                            <InputField type='text' formik={formik} placeholder='Country' name='country' />
                        </div>
                        <InputField type='phone' formik={formik} placeholder='Phone' name='phone' />
                        <button type='submit' className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>Save Address</button>
                    </form>
                </div>
                <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt="Add Address" />
            </div>
        </div>
    )
}

export default AddAddress