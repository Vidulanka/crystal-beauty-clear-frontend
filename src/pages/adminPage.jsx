import { Link, Route, Routes } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { MdWarehouse } from "react-icons/md";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import AdminProductsPage from "./admin/product";
import AddProductForm from "./admin/addProductform";
import EditProductForm from "./admin/editProoduct";




export default function AdminPage() {
    
    return (
        <div className="w-full h-screen  bg-gray-200 flex p-2 ">
            <div className="h-full w-[300px] ">
            <Link to="/admin/users" className=" p-2  flex  items-center"><FaUsers className="mr-2" /> Users</Link>                                                                                                                                                                                                                            
                <Link to="/admin/products" className="p-2  flex  items-center"><MdWarehouse className="mr-2"/>Product</Link>
                <Link to="/admin/orders" className="p-2  flex  items-center"><LiaFileInvoiceSolid className="mr-2" />Orders</Link>
               
            </div>
            < div className="h-full bg-white w-[calc(100vw-300px)] rounded-lg">
             <Routes path="/*">
                <Route path ="/users" element={<h1>Users</h1>}/>
                <Route path ="/products" element={ <AdminProductsPage/>}/>
                <Route path ="/orders" element={<h1>Orders</h1>}/>
                <Route path= "addProduct" element={<h1>{<AddProductForm/>}</h1>}/>
                <Route path= "/editProduct" element={<EditProductForm/>}/>
            </Routes>
            </div>

        </div>
    )
}