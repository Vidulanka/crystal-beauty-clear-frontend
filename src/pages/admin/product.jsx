import axios from "axios"
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function AdminProductsPage () {

    const [products,setProducts] = useState([])
    useEffect(
        () =>{
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
        (res) =>{
             console.log(res.data)
             setProducts(res.data)
        }
    )
    
 }

 ,
 []

    )

    

   

    return (
        <div className="w-full h-full rounded-lg relative">

            <Link to={"/admin/addProduct"} className="text-white absolute bg-gray-700 p-[12px] text-3xl rounded-full cursor-pointer hover:bg-gray-300 hover:text gray-700 right-5 bottom-5">
                <AiOutlinePlus />

            </Link>
            <table className="w-full bg-pink-200 ">
                <thead>
                     <tr>
                       
                          <th className="p-2">productID</th>
                          <th className="p-2">name</th>
                          <th className="p-2">price</th>
                          <th className="p-2">lebeledPrice</th>
                          <th className="p-2">stock</th>

                     </tr>

                </thead>


                <tbody>
                  {
              products.map(
                  (product,index)=>{
                    console.log("mapping"+product.productId)
                    return(

                        <tr key={index}className="border-b-2 border-gray-300 text-center cursor-pointer hover:bg-gray-700 hover:text-white">
                            <td className="p-2">{product.productID}</td>
                            <td className="p-2">{product.name}</td>
                            <td className="p-2">{product.price}</td>
                            <td className="p-2">{product.lebeledPrice}</td>
                            <td className="p-2">{product.stock}</td>
                        </tr>

                        
                        
                        
                    )
                  }
                  
              )
            } 








                </tbody>
            </table>
           
        </div>
        
    )
}