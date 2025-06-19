import axios from "axios"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlinePlus } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

export default function AdminProductsPage () {

    const [products,setProducts] = useState([])
    const [loaded,setLoaded] = useState(false)
    const navigate = useNavigate()
    useEffect(
        () =>{
            if(!loaded){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
         (res) =>{
             console.log(res.data)
             setProducts(res.data)
             setLoaded(true)
        }
    )
    
 }
        }
 
  ,[loaded]

    )

     async function deleteProduct (id) {
       const token = localStorage.getItem("token");
       if (token == null) {
           toast.error("Please login to delete Product");
           return;
       }
       try{
       await axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/product/"+id,{
           headers: {
               "Authorization": "Bearer " +token
           },
           
       })
       setLoaded(false)
       toast.success("Product deleted successfully");
    
       }catch(err){
        console.log(err);
        toast.error("Failed to delete Product");
        return
       }
    }

    

   

    return (
        <div className="w-full h-full rounded-lg relative">

            <Link to={"/admin/addProduct"} className="text-white absolute bg-gray-700 p-[12px] text-3xl rounded-full cursor-pointer hover:bg-gray-300 hover:text-gray-700 right-5 bottom-5">
                <AiOutlinePlus />

            </Link>
            {loaded && <table className="w-full ">
                <thead>
                     <tr>
                       
                          <th className="p-2">productID</th>
                          <th className="p-2">name</th>
                          <th className="p-2">price</th>
                          <th className="p-2">lebeledPrice</th>
                          <th className="p-2">stock</th>
                          <th className="p-2">Actions</th>

                     </tr>

                </thead>


                <tbody>
                  {
              products.map(
                  (product,index)=>{
                    
                    return(

                        <tr key={index}className="border-b-2 border-gray-300 text-center cursor-pointer hover:bg-gray-100 ">
                            <td className="p-2">{product.productID}</td>
                            <td className="p-2">{product.name}</td>
                            <td className="p-2">{product.price}</td>
                            <td className="p-2">{product.lebeledPrice}</td>
                            <td className="p-2">{product.stock}</td>
                            <td className="p-2">
                                <div className="w-full h-full  flex justify-center ">
                                       <RiDeleteBin6Line onClick={() =>{
                                        deleteProduct(product.productID)
                                        
                                        
                                       }} className="text-[25px] m-[10px] hover:text-red-500" />
                                        <GrEdit
                                          onClick={
                                               ()=>{
                                                  navigate("/admin/editProduct/",{
                                                         state:product

                                                  }
                                                  )
                                               }


                                          }
                                        
                                        className="text-[25px] m-[10px] hover:text-blue-500" />
                                </div>
                            </td>
                        </tr>

                        
                        
                        
                    )
                  }
                  
              )
            } 








                </tbody>
            </table>}
            {
              !loaded && 

                      <Loader/>
            
            }
           
        </div>
        
    )
}

