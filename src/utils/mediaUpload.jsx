import { createClient } from "@supabase/supabase-js";





const supabase= createClient(
    "https://cvdfovhspaksxldsjrza.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2ZGZvdmhzcGFrc3hsZHNqcnphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNDc2MTcsImV4cCI6MjA2NTcyMzYxN30.bA8qa8E-SXvETnCoULY0IIGOmVTxHj5KUy3AO04Jc0E"
  );  
export default function mediaUpload(file){
    const promise= new Promise(
        (resolve,reject)=>{
            if(file==null){
                reject ("No file selected")
            }
            const timeStamp = new Date().getTime()
            const newFileName = timeStamp + file.name
            
            supabase.storage.from("images").upload(newFileName,file,{
                cacheControl:"3600",
                upsert: false,
            }).then(
                ()=>{
                    const url=supabase.storage.from("images").getPublicUrl(newFileName).data.publicUrl
                    resolve(url)
                }
            ).catch(
                (error)=>{
                    console.log(error)
                    reject("Failed to upload file")
                }
            )


}
    )
    return promise
}



  
