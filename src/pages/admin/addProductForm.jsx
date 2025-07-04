import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"
import mediaUpload from "../../utils/mediaUpload";

export default function AddProductForm () {
    const[productId,setProductId]=useState(""); 
    const[name,setName]=useState("");
    const[altNames,setAltNames]=useState("");
    const[price,setPrice]=useState("");
    const[lebeledPrice,setLebelPrice]=useState("");
    const[description,setDescription]=useState("");
    const[stock,setStock]=useState("");
    const [images, setImages] = useState([]);
    const navigate= useNavigate()
      
    async function handleSubmit(){
        const promiseArray=[]
        for (let i=0;i<images.length;i++){
            const promise = mediaUpload(images[i]);
            promiseArray[i]=promise
        }
        try{

        
        const result = await Promise.all(promiseArray)
       

        const altNamesInArray = altNames.split(",");
        const product={
            productID:productId,
            name:name,
            altNames:altNamesInArray,
            price:price,
            lebeledPrice:lebeledPrice,
            description:description,
            stock:stock,
            images:result
        }
        const token = localStorage.getItem("token");
        console.log(token)

        await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/product",product,{
            headers: {
                "Authorization": "Bearer " +token
            },
        }) 
        toast.success ("Product added successfully");
        navigate("/admin/products")  
       
    }catch(error){
        console.log(error);
       
        toast.error("File upload failed");
    }    
        
    }
    

    return (
        <div className="  min-h-screen w-full h-full rounded-lg  flex justify-center items-center">
            <div className="w-[500px] h-[600px]  rounded-lg shadow-lg flex flex-col items-center">

                 <h1 className="text-3xl font-bold text-gray-700 m-[10px] ">Add Product</h1>
                   <input
                   value={productId}
                   onChange={
                    (e)=>{
                    setProductId(e.target.value)
                }
            }
                   className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                   placeholder="product ID"
                    />
                   <input
                   value={name}
                   onChange={
                      (e)=>{
                        setName(e.target.value)
                      }

                   }

                   className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                   placeholder="product Name"
                    />
                   <input  
                   value={altNames} 
                   onChange={
                    (e)=>{
                        setAltNames(e.target.value)
                    }

                   }
                   className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                   placeholder="Alternative Name"

                   />

                     <input   
                      value={price} 
                   onChange={
                    (e)=>{
                        setPrice(e.target.value)
                    }

                   }
                   type="number"
                   className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                   placeholder="Price"

                   />

                       <input 
                        value={lebeledPrice} 
                   onChange={
                    (e)=>{
                        setLebelPrice(e.target.value)
                    }

                   }  
                   type="number"
                   className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                   placeholder=" Labelled Price"

                   />

                     <textarea   
                      value={description} 
                   onChange={
                    (e)=>{
                        setDescription(e.target.value)
                    }

                   }
                   className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                   placeholder="Description"

                   />
                   <input
                        type="file"
                        onChange={(e)=>{
                                setImages(e.target.files)
                            
                        }}
                        multiple
                        className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                        placeholder="Product Image"
                    />
                       <input  
                        value={stock} 
                   onChange={
                    (e)=>{
                        setStock(e.target.value)
                    }

                   } 
                   type="number"
                   className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
                   placeholder="Stock"

                   />
                   <div className="w-[400px]  h-[100px]  flex justify-between items-center rounded-b-lg">
                   <Link to={"/admin/products"} className=" bg-red-500  text-white p-[10px] w-[180px] text-center rounded-lg m-[5px] hover:bg-red-600   ">Cancel</Link>
                   <button onClick={handleSubmit} className=" bg-green-500 cursor-pointer  text-white p-[10px] w-[180px] text-center rounded-lg m-[5px] hover:bg-green-600   ">Add Product</button>
                   </div>
            </div>
            
         </div>
    )
}