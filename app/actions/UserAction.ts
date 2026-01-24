"use server"

import axios from "axios";

 export async function getVdoCipherOTP(videoUrl:any,token:any) {
            
         try {
          
         const { data } = await axios.post("http://localhost:8000/api/v2/course/get-videoCipher-otp", { videoId: videoUrl },{
        headers: {
          Authorization: `Bearer ${token}`, // token manually pass kiya
        },
      });
             console.log("data",data);
         return data;    
             
         } catch (err:any) {
             
         console.log("error",err.response.data.message)
         
         }
          
     };