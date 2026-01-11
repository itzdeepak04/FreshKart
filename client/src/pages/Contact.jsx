import React from 'react';

function Contact() {
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
            <p className="text-gray-500 mt-2">+91 98765 43210</p>
          </div>
        </div>

        {/* Right Form UI */}
        <div className="space-y-5">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary resize-none"
            ></textarea>
          </div>

          <button
            className="px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
