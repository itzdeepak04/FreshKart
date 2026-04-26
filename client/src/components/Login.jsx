import React, { useState } from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";
function Login() {
    const [state, setState] = useState("login");
    const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

    const validationSchema = Yup.object({
        name: state === 'register' ? Yup.string().required("Name is required") : Yup.string(),
        email:state=='register'
            ? 
            Yup.string().required('Email is required').email()
            :
            Yup.string().required('Email is required'),
        password: state === "register"
            ?
            Yup.string().required("Password is required")
                .min(8, "Minimum 8 characters")
                .matches(
                    /[A-Z]/,
                    "Must contain at least one uppercase letter"
                )
                .matches(
                    /[a-z]/,
                    "Must contain at least one lowercase letter"
                )
                .matches(/[0-9]/, "Must contain at least one number")
                .matches(
                    /[!@#$%^&*]/,
                    "Must contain at least one special character"
                )
            :
            Yup.string().required("Password is required"),
    });

    const { handleChange, handleBlur, handleSubmit, resetForm, errors, values, touched } = useFormik({
        initialValues: { name: '', email: '', password: '' },
        validationSchema,
        onSubmit: submitHandler
    })

    async function submitHandler(values) {
        try {
            const { data } = await axios.post(`/api/user/${state}`, values);
            if (data.status) {
                toast.success(data.message)
                navigate('/');
                setUser(data.user);
                setShowUserLogin(false);
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50">
            <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="relative flex flex-col gap-4 m-auto items-start p-8 py-12 pt-5 w-80 sm:w-88 text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
            <img src={assets.cross_icon} onClick={()=>setShowUserLogin(false)} className="cursor-pointer w-10 absolute top-5 right-5"/>
                <p className="text-2xl font-medium m-auto mt-5">
                    <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
                </p>
                {state === "register" && (
                    <div className="w-full">
                        <p>Name</p>
                        <input name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} placeholder="Enter you name"
                         className={`border rounded w-full p-2 mt-1 outline-primary" type="text
                                    ${touched.name && errors.name ? "border-red-500" : "border-gray-200"}`} />
                        {(touched.name && errors.name) && <p className="text-red-500 text-sm z-50">{errors.name}</p>}
                    </div>
                )}
                <div className="w-full ">
                    <p>Email</p>
                    <input name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} placeholder="Enter your email address"
                     className={`border rounded w-full p-2 mt-1 outline-primary" type="email
                                ${touched.email && errors.email ? "border-red-500" : "border-gray-200"}`} />
                    {(touched.email && errors.email) && <p className="text-red-500 text-sm z-50">{errors.email}</p>}
                </div>
                <div className="w-full ">
                    <p>Password</p>
                    <input name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} placeholder="Enter password" 
                    className={`border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="password
                                ${touched.password && errors.password ? "border-red-500" : "border-gray-200"}`} />
                    {(touched.password && errors.password) && <p className="text-red-500 text-sm z-50">{errors.password}</p>}
                </div>
                {state === "register" ? (
                    <p>
                        Already have account? <span onClick={() => { setState("login"), resetForm() }} className="text-indigo-500 cursor-pointer">click here</span>
                    </p>
                ) : (
                    <p>
                        Create an account? <span onClick={() => { setState("register"); resetForm() }} className="text-indigo-500 cursor-pointer">click here</span>
                    </p>
                )}
                <button type="submit" className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
                    {state === "register" ? "Create Account" : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
