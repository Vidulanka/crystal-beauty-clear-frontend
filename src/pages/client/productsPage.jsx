import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProductCard from "../../components/product-card";

export default function ProductsPage() {
    const [productList, setProductList] = useState([]);
    const [productsLoaded, setProductsLoaded] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!productsLoaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/").then((res) => {
                setProductList(res.data);
                setProductsLoaded(true);
            });
        }
    }, [productsLoaded]);

    function searchProducts() {
        if (search.length > 0) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/search/" + search).then((res) => {
                setProductList(res.data.products);
            });
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50 py-8 px-4 sm:px-6 lg:px-8">
            {/* Elegant Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 sm:text-5xl mb-3">
                    Our Products
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-pink-600">
                    Discover our beautiful collection
                </p>
            </div>

            {/* Romantic Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <div className="relative flex-grow w-full">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            className="w-full h-12 px-5 pr-16 rounded-full border-2 border-pink-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200 shadow-sm"
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && searchProducts()}
                        />
                        <button
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-400 hover:text-pink-600"
                            onClick={searchProducts}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                    <button
                        className="h-12 px-6 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-full transition-colors duration-200 shadow-md hover:shadow-lg"
                        onClick={searchProducts}
                    >
                        Search
                    </button>
                    <button
                        className="h-12 px-6 bg-white text-pink-600 border border-pink-300 font-medium rounded-full transition-colors duration-200 hover:bg-pink-50"
                        onClick={() => setProductsLoaded(false)}
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Product Grid - Using original ProductCard component */}
            {productsLoaded ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {productList.map((product) => (
                        <div key={product.productID} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-pink-100">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center h-64">
                    <Loader />
                </div>
            )}

            {/* Decorative Footer */}
            <div className="mt-12 text-center text-pink-400 text-sm">
                Showing {productsLoaded ? productList.length : 0} products
            </div>
        </div>
    );
}