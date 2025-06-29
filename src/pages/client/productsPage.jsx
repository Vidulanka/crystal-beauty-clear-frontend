import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProductCard from "../../components/product-card";

export default function ProductsPage() {
  const [productList, setProductList] = useState([]);
  const [productLoaded, setProductsLoaded] = useState(false);

  useEffect(() => {
    if (!productLoaded) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product").then((res) => {
        setProductList(res.data);
        setProductsLoaded(true);
      });
    }
  }, [productLoaded]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50 py-16 px-6 sm:px-10 lg:px-16">
      {productLoaded ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {productList.map((product) => (
            <div
              key={product.productID}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-96">
          <Loader />
        </div>
      )}
    </div>
  );
}
