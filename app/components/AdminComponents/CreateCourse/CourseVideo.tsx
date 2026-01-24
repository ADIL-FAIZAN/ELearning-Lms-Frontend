"use client"

import axios from "axios";
import { useEffect, useState } from "react";


type Props = {

    videoUrl:""

};

const CourseVideo = ({videoUrl}: Props) => {

   const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
   });
  


    useEffect(() => {
    
     async function getVdoCipherOTP() {
            
         try {
          
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}course/get-videoCipher-otp`, { videoId: videoUrl }, { withCredentials: true });

    setVideoData(data);    
             
    } catch (err) {
           
    console.log(err)
         
    }
          
     };
        
     getVdoCipherOTP();

    }, [videoUrl]);
    



  return (
  
    <div className="w-full h-full">
        <>
       <iframe
   
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData?.playbackInfo}&player=K29uoVZ456N8tJ87`}
          style={{
            border: 0,
            maxWidth: "100%",
            position: "relative",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        />         
      
    
      
      </>

      </div>
 
  )
}

export default CourseVideo