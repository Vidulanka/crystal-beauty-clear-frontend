
import { useState } from "react";
import mediaUpload from "../utils/mediaUpload";
import toast from "react-hot-toast";


export default function Testing (){
  const [file, setFile] = useState (null); 
  

  function handleUpload (){
    mediaUpload(file).then(
      (url) => {
        console.log(url);
        toast.success("Image uploaded successfully");
      }
    ).catch(
      (error) => {
        console.log(error);
        toast.error("Failed to upload image");
      }
    )
     

  }

    return(
      <div className="w-full h-screen flex flex-col justify-center items-center">
          <input type ="file" onChange={
            (e) => {
              setFile(e.target.files[0])
            }
          }/>
          <button onClick={handleUpload}className="bg-blue-500 text-white p-2 rounded">Upload</button>


      </div>
   
       
     
      
    )
  }
