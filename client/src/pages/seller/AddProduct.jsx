import React, { useState } from 'react'
import { assets, categories } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required').min(20).max(100),
    category: Yup.string().required('Required'),
    price: Yup.number().required('Required').positive('Price must be positive'),
    offerPrice: Yup.number().required('Required').positive('OfferPrice must be positive')
})

function AddProduct() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const { axios,fetchProducts } = useAppContext();
    const {values,errors,touched,handleChange,handleBlur,handleSubmit,resetForm} = useFormik({
        initialValues: { name: '', description: '', category: '', price: 0, offerPrice: 0 },
        validationSchema,
        onSubmit: submitHandler
    })

    async function submitHandler(values) {
        if(loading) return;
        try {
            setLoading(true);
            const productData = { ...values, description: values.description.split('\n') };

            const formData = new FormData();
            formData.append("productData", JSON.stringify(productData));
            files.forEach(file => { if (file) formData.append('images',file) });
            const { data } = await axios.post('/api/product/add', formData);

            if (data.status) {
                toast.success(data.message);
                resetForm();
                setFiles([]);
                await fetchProducts();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">

                <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>
                                <input
                                    onChange={(e) => {
                                        const updatedFiles = [...files];
                                        updatedFiles[index] = e.target.files[0];
                                        setFiles(updatedFiles);
                                    }}
                                    accept="image/*"
                                    type="file"
                                    id={`image${index}`}
                                    hidden
                                />
                                <img
                                    className="max-w-24 cursor-pointer opacity-90"
                                    src={files[index]
                                        ? URL.createObjectURL(files[index])
                                        : assets.upload_area}
                                    alt="uploadArea"
                                    width={100}
                                    height={100}
                                />
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">
                        Product Name
                    </label>
                    <input
                        name='name'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        id="product-name"
                        type="text"
                        placeholder="Type here"
                        className={`outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40
                                    ${touched.name && errors.name ? "border-red-500" : "border-gray-200"}`}
                        disabled={loading}
                    />
                    {(touched.name && errors.name) && <p className="text-red-500 text-sm z-50">{errors.name}</p>}
                </div>

                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">
                        Product Description
                    </label>
                    <textarea
                        name='description'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        id="product-description"
                        rows={4}
                        className={`outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none
                                    ${touched.description && errors.description ? "border-red-500" : "border-gray-200"}`}
                        placeholder="Type here"
                        disabled={loading}
                    />
                    {(touched.description && errors.description) && <p className="text-red-500 text-sm z-50">{errors.description}</p>}
                </div>

                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">
                        Category
                    </label>
                    <select
                        name='category'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.category}
                        id="category"
                        className={`outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40
                                    ${touched.category && errors.category ? "border-red-500" : "border-gray-200"}`}
                        disabled={loading}
                    >
                        <option value="">Select Category</option>
                        {categories.map((item, index) => (
                            <option key={index} value={item?.path}>
                                {item?.path}
                            </option>
                        ))}
                    </select>
                    {(touched.category && errors.category) && <p className="text-red-500 text-sm z-50">{errors.category}</p>}
                </div>

                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">
                            Product Price
                        </label>
                        <input
                            name='price'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.price}
                            id="product-price"
                            type="number"
                            placeholder="0"
                            className={`outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40
                                        ${touched.price && errors.price ? "border-red-500" : "border-gray-200"}`}
                            disabled={loading}
                        />
                        {(touched.price && errors.price) && <p className="text-red-500 text-sm z-50">{errors.price}</p>}
                    </div>

                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">
                            Offer Price
                        </label>
                        <input
                            name='offerPrice'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.offerPrice}
                            id="offer-price"
                            type="number"
                            placeholder="0"
                            className={`outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40
                                        ${touched.offerPrice && errors.offerPrice ? "border-red-500" : "border-gray-200"}`}
                            disabled={loading}
                        />
                        {(touched.offerPrice && errors.offerPrice) && <p className="text-red-500 text-sm z-50">{errors.offerPrice}</p>}
                    </div>
                </div>

                <button
                    type='submit'
                    disabled={loading}
                    className={`px-8 py-2.5 text-white font-medium rounded cursor-pointer
                        ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary'}`}
                >
                    {loading ? 'Adding Product...' : 'ADD'}
                </button>

            </form>
        </div>
    );
}
export default AddProduct;
