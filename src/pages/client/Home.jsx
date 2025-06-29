import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [featuredProducts] = useState([
    {
      id: "COSM12",
      name: "Hydrating Serum",
      price: "LKR 700.00",
      img: "https://cvdfovhspaksxldsjrza.supabase.co/storage/v1/object/public/images//1750355531099284da450-f4e1-497e-a696-f3ce5766f1a8.jpeg",
      category: "Serums",
      rating: 4.9,
      description: "Deep hydration for radiant skin"
    },
    {
      id: "COSM13",
      name: "Hydrating Face Serum",
      price: "LKR 1,299.00",
      img: "https://cvdfovhspaksxldsjrza.supabase.co/storage/v1/object/public/images//175035569917998f48490-1603-4490-b782-7029729c68b5.jpeg",
      category: "Serums",
      rating: 4.7,
      description: "Advanced formula for glowing complexion"
    },
    {
      id: "COSM15",
      name: "Vitamin C Brightening Cream",
      price: "LKR 899.00",
      img: "https://cvdfovhspaksxldsjrza.supabase.co/storage/v1/object/public/images//17503557421338c0afb17-fdf1-4963-8368-a24d97b22a91.jpeg",
      category: "Moisturizers",
      rating: 4.8,
      description: "Illuminate and even skin tone"
    },
    {
      id: "COSM17",
      name: "Revitalizing Eye Cream",
      price: "LKR 1,199.00",
      img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Eye Care",
      rating: 4.6,
      description: "Reduce dark circles and puffiness"
    }
  ]);

  const [categories] = useState([
    { name: "Skincare", count: 24, icon: "🌸" },
    { name: "Makeup", count: 36, icon: "💄" },
    { name: "Hair Care", count: 18, icon: "💇‍♀️" },
    { name: "Body Care", count: 15, icon: "🧴" }
  ]);

  const [testimonials] = useState([
    { 
      id: 1, 
      name: "Priya S.", 
      text: "The Hydrating Serum transformed my dry skin in just two weeks. My complexion has never looked better!", 
      rating: 5 
    },
    { 
      id: 2, 
      name: "Anjali R.", 
      text: "The Vitamin C Cream has faded my dark spots significantly. I'm so impressed with the results!", 
      rating: 5 
    },
    { 
      id: 3, 
      name: "Maya K.", 
      text: "Crystal Beauty products are worth every rupee. Natural, effective and cruelty-free!", 
      rating: 4 
    }
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Floating Cart Button */}
      <div className={`fixed right-6 z-50 transition-all duration-500 ${isScrolled ? "top-24" : "top-6"}`}>
        <Link 
          to="/cart"
          className="bg-pink-600 text-white p-4 rounded-full shadow-lg hover:bg-pink-700 transition-all hover:scale-105 flex items-center justify-center"
          aria-label="View cart"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="bg-white text-pink-600 rounded-full w-5 h-5 text-xs flex items-center justify-center absolute -top-1 -right-1">3</span>
        </Link>
      </div>

      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="bg-cover bg-center w-full h-full" 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1522338242992-e1a54906a8da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
              transform: `translateY(${window.scrollY * 0.3}px)`,
              transition: "transform 0.1s ease-out"
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600/40 to-purple-600/40"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-down">
            Discover Your <span className="text-pink-200">Natural Radiance</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 animate-fade-in-up">
            Pure, natural cosmetics crafted to enhance your unique beauty
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up">
            <Link 
              to="/products"
              className="bg-white text-pink-600 py-3 px-8 rounded-full font-bold shadow-lg hover:bg-pink-100 hover:shadow-xl transition-all duration-300"
            >
              Shop Collection
            </Link>
            <Link 
              to="/about"
              className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-full font-bold hover:bg-white/10 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pink-700 mb-4">Our Beauty Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our premium collections tailored for every beauty need
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link 
                to={`/products?category=${category.name.toLowerCase()}`}
                key={index}
                className="group"
              >
                <div className="bg-pink-50 rounded-xl overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 p-6 text-center">
                  <div className="text-4xl mb-4 transition-transform group-hover:scale-110">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-pink-700 mb-1">{category.name}</h3>
                  <p className="text-gray-600 text-sm">{category.count} products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pink-700 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most loved beauty essentials
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Featured
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
                    <div className="flex items-center bg-pink-100 text-pink-800 px-2 py-1 rounded text-sm">
                      <span>★</span> {product.rating}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-xl font-bold text-pink-600">{product.price}</p>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Link 
                      to={`/overview/${product.id}`}
                      className="flex-1 text-center bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg transition duration-300"
                    >
                      View Details
                    </Link>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/products" 
              className="inline-block bg-white border border-pink-600 text-pink-600 hover:bg-pink-50 font-medium py-3 px-8 rounded-full transition duration-300"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Beauty Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Natural Ingredients" 
                className="rounded-xl shadow-lg w-full"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-pink-700 mb-6">Pure & Natural Beauty</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-pink-100 text-pink-600 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Cruelty-Free Formulas</h3>
                    <p className="text-gray-600">All our products are ethically produced and never tested on animals</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-pink-100 text-pink-600 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Natural Ingredients</h3>
                    <p className="text-gray-600">Formulated with plant-based extracts and free from harsh chemicals</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-pink-100 text-pink-600 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Visible Results</h3>
                    <p className="text-gray-600">Experience transformative results with our clinically proven formulas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pink-700 mb-4">Customer Love</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear what our beautiful customers have to say
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-white p-8 rounded-xl border border-pink-100 shadow-sm"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-full w-12 h-12" />
                  <div className="ml-4">
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-pink-600 text-sm">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

          {/* Contact Section */}
      <section className="py-16 bg-gradient-to-br from-pink-100 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gradient-to-br from-pink-500 to-purple-600 p-10 text-white">
                <h2 className="text-3xl font-bold mb-6">Have Questions?</h2>
                <p className="mb-6">Our beauty experts are here to help you find the perfect products for your skin type.</p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-white/20 p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Call Us</h3>
                      <p>+94 77 123 4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white/20 p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Email Us</h3>
                      <p>info@crystalbeauty.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white/20 p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Visit Us</h3>
                      <p>123 Beauty Street, Colombo, Sri Lanka</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 p-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a message</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Your Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Your Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Message</label>
                    <textarea 
                      rows="4" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-pink-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-pink-700 transition duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}