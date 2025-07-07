import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiSend, FiUser, FiMail, FiMessageSquare } from "react-icons/fi";
import { FaWhatsapp, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/contact", formData);
      
      // Show success state
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      
      toast.success(
        <div className="text-center">
          <p className="font-bold text-lg">Thank you for your message!</p>
          <p>Our beauty expert will respond within 24 hours.</p>
        </div>,
        { duration: 5000 }
      );
      
    } catch (error) {
      toast.error(
        <div className="text-center">
          <p className="font-bold text-lg">Message not sent</p>
          <p>Please try again or contact us directly.</p>
        </div>,
        { duration: 4000 }
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Contact Crystal Beauty
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to help with any questions about our products or your skincare journey.
          </p>
        </div>

        {/* Contact Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white rounded-3xl shadow-lg p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Get In Touch</h2>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-pink-100 p-4 rounded-xl mr-6 text-pink-600">
                  <FaPhoneAlt className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Call Us</h3>
                  <p className="text-lg text-gray-600 mt-1">+94 77 123 4567</p>
                  <p className="text-gray-500 mt-2">Monday - Friday, 9am - 5pm</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-pink-100 p-4 rounded-xl mr-6 text-pink-600">
                  <FaWhatsapp className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">WhatsApp</h3>
                  <p className="text-lg text-gray-600 mt-1">+94 77 123 4567</p>
                  <p className="text-gray-500 mt-2">24/7 customer support</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-pink-100 p-4 rounded-xl mr-6 text-pink-600">
                  <FiMail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Email</h3>
                  <p className="text-lg text-gray-600 mt-1">support@crystalbeauty.com</p>
                  <p className="text-gray-500 mt-2">Typically responds within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-pink-100 p-4 rounded-xl mr-6 text-pink-600">
                  <FaMapMarkerAlt className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Visit Us</h3>
                  <p className="text-lg text-gray-600 mt-1">123 Beauty Lane, Colombo 03</p>
                  <p className="text-gray-500 mt-2">By appointment only</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Follow Us</h3>
              <div className="flex space-x-4">
                {['Facebook', 'Instagram', 'TikTok'].map((social) => (
                  <a 
                    key={social}
                    href="#"
                    className="bg-gray-100 hover:bg-pink-100 text-gray-700 hover:text-pink-600 p-4 rounded-xl transition-all duration-300"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-lg p-10">
            {success ? (
              <div className="text-center py-12">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                  <FiSend className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Message Received!</h3>
                <p className="text-lg text-gray-600 mb-8">
                  Thank you for contacting Crystal Beauty. Our skincare specialist will get back to you shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-8 py-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-colors text-lg font-medium"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Send a Message</h2>
                <p className="text-gray-600 text-lg mb-8">
                  Have questions about our products? Fill out the form below and we'll respond promptly.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                      Your Name <span className="text-pink-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FiUser className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                      Email Address <span className="text-pink-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FiMail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
                      Your Message <span className="text-pink-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute top-4 left-4">
                        <FiMessageSquare className="h-5 w-5 text-gray-400" />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="block w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        placeholder="How can we help you today?"
                      />
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="privacy"
                        name="privacy"
                        type="checkbox"
                        required
                        className="focus:ring-pink-500 h-5 w-5 text-pink-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-base">
                      <label htmlFor="privacy" className="font-medium text-gray-700">
                        I agree to Crystal Beauty's <a href="#" className="text-pink-600 hover:underline">privacy policy</a>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Your Message...
                      </>
                    ) : (
                      <>
                        <FiSend className="mr-3 h-6 w-6" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}