import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
function Contact() {
  const validationSchema=Yup.object({
    name:Yup.string().required('Name is required'),
    email:Yup.string().required('Email is required').email(),
    message:Yup.string().required('Required').min(50).max(2000)
  })

  const {values,errors,touched,handleChange,handleBlur,handleSubmit,resetForm}=useFormik({
    initialValues:{name:'',email:'',message:''},
    validationSchema,
    onSubmit:submitHandler
  })

  function submitHandler(values){
    toast.success('Submitted');
    resetForm();
  }
  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-16 lg:px-24 xl:px-32 py-12 mt-16">
      
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
          Contact Us
        </h1>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          We’d love to hear from you. Reach out to us for any queries, support, or feedback.
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        
        {/* Left Info Section */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800">Our Address</h3>
            <p className="text-gray-500 mt-2">
              123, Fresh Street<br />
              Bangalore, Karnataka<br />
              India - 560001
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800">Email</h3>
            <p className="text-gray-500 mt-2">support@freshkart.com</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800">Phone</h3>
            <p className="text-gray-500 mt-2">+91 98989 89898</p>
          </div>
        </div>

        {/* Right Form UI */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text" name="name" value={values.name}
              onChange={handleChange} onBlur={handleBlur}
              placeholder="Enter your name"
              className={`w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary
                         ${touched.name && errors.name ? "border-red-500" : "border-gray-200"}`}
            />
            {(touched.name && errors.name) && <p className="text-red-500 text-sm z-50">{errors.name}</p>}
          </div>

          <div>
            <label className="text-sm text-gray-600">Email Address</label>
            <input
              type="email "name="email" value={values.email}
              onChange={handleChange} onBlur={handleBlur}
              placeholder="Enter your email"
              className={`w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary
                        ${touched.email && errors.email ? "border-red-500" : "border-gray-200"}`}
            />
            {(touched.email && errors.email) && <p className="text-red-500 text-sm z-50">{errors.email}</p>}
          </div>

          <div>
            <label className="text-sm text-gray-600">Message</label>
            <textarea
              rows="4" name="message" value={values.message}
              onChange={handleChange} onBlur={handleBlur}
              placeholder="Write your message"
              className={`w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary resize-none
                        ${touched.message && errors.message ? "border-red-500" : "border-gray-200"}`}
            ></textarea>
            {(touched.message && errors.message) && <p className="text-red-500 text-sm z-50">{errors.message}</p>}
          </div>

          <button type="submit"
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
