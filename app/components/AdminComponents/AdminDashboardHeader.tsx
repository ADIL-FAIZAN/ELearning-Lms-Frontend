"use client"

import React, { useEffect, useState,useRef } from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'
import ThemeSwitcher from '../ThemeSwitcher'
import socketIO from "socket.io-client";
import { useGetAllNotificationsQuery, useUpdateNotificationStatusMutation } from '../../../redux/features/notifications/notifications';
import { format } from 'timeago.js';
const EndPoint = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "";
const socketId = socketIO(EndPoint,{transports: ["websocket"]});


type Props = {}

const AdminDashboardHeader = (props: Props) => {

 const {data:AllNotificationsData,isLoading:AllNotificationsLoading,error:AllNotificationsError,refetch:refechAllNotifications} = useGetAllNotificationsQuery(undefined,{refetchOnMountOrArgChange:true});
 const [updateNotificationStatus,{isLoading:updateNotificationLoading,isSuccess:updateNotificationSuccess,error}] = useUpdateNotificationStatusMutation();
 const [notifications, setNotification] = useState([]);
 const [notificationClickPopUp, setNotificationClickPopUp] = useState(false); 
  
    const audioRef = useRef<HTMLAudioElement | null>(null);
  
   useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(
        "https://res.cloudinary.com/dasdrngo1/video/upload/v1715355770/notifications/mixkit-bubble-pop-up-alert-notification-2357_wbwviv.wav"
      );
    }
  }, []);



  const PlayNotificationSound = () => {
    audioRef.current?.play().catch((err) => {
      console.error("Error Audio Playing: ", err);
    });
  };
  
  
  
//  const audio = new Audio(
//   "https://res.cloudinary.com/dasdrngo1/video/upload/v1715355770/notifications/mixkit-bubble-pop-up-alert-notification-2357_wbwviv.wav"
//   );

//   const PlayNotificationSound = () => {
    
//     audio.play();

//   };


  useEffect(() => {
   
    if (AllNotificationsData?.AllNotifications) {

      const filterUnreadNotifications = AllNotificationsData?.AllNotifications?.filter((eachNotification: any) => {
    
        if (eachNotification?.status === "unread") {

        return true;

        } else {

        return false;

        }

      });
    
      setNotification(filterUnreadNotifications);

    };

    

  },[AllNotificationsData?.AllNotifications])


  useEffect(() => {
  
    if (updateNotificationSuccess) {
    
    refechAllNotifications();  

    };

  }, [updateNotificationSuccess]);


  useEffect(() => {
  
    socketId.on("AdminNewNotification", (data: any) => {

      refechAllNotifications();
      PlayNotificationSound();

    });

  }, []);


  useEffect(() => {

    if (notificationClickPopUp) {
    
        // Disable body scroll when cart opens
      document.body.style.overflow = "hidden";
      
    return () => {
      // Re-enable scroll when cart closes
      document.body.style.overflow = "auto";
    };  

    }

   
  }, [notificationClickPopUp]);



  const updateNotificationStatusHandler = async (notificationId:number) => {
  
    if (!updateNotificationLoading) {
    await updateNotificationStatus(notificationId);     
   } 

  };


  return (

    <div className='w-full'>
      
    <div className='h-[70px] w-full flex justify-end items-center mb-5'>
          
    <div className='flex gap-5'>
        
        <ThemeSwitcher  />
          
        <div className='relative' onClick={() =>{setNotificationClickPopUp(!notificationClickPopUp)}}>
              
        <IoMdNotificationsOutline className="text-2xl cursor-pointer text-white" />          
        <span className="absolute -top-2 -right-1 cursor-pointer bg-[#3ccba0] rounded-full w-5 h-5 text-[12px] flex items-center justify-center text-white">
        {notifications && notifications?.length}
        </span>
        </div>         
    
      </div>  
      </div>
  
      {notificationClickPopUp ? (
  
      <>
      
      <div className='w-[300px] h-[500px] pb-5 px-2 pt-3 z-[9999] rounded fixed top-14 right-10 bg-[#111C43] overflow-y-auto'>

      
      <div className='w-full flex justify-center mb-4'>
      <div className='font-bold text-[20px]'>Notification</div>
      </div>       
            
      {notifications?.map((eachNotification: any) => (
      
      <div className='bg-gray-700 max-h-[180px] cursor-pointer px-[5px] py-[5px] border-b border-white'>  {/* Each Notification Div */}
                 
      <div className='flex'> {/* Notification Div title start Here */}
      <div className='w-[60%] text-[13px]'>
      {eachNotification?.title}          
      </div>       
      
            <div className='w-[40%] text-[14px] flex justify-end' onClick={() =>{updateNotificationStatusHandler(eachNotification?._id)}}>
      Mark as read
      </div>         
      </div>  {/* Notification Div title End Here */}
      
      <div className='w-full mt-1 text-[15px]'>  {/* Notification Message Div Here  .toSlice(0,156) */}
      {eachNotification?.message?.slice(0,156)}
      </div>  {/* Notification Messae Div End Here */}     

          
      <div className='w-full mt-[6px] text-[12px]'>  {/* Notification Messae Div Here */}
      {format(eachNotification?.createdAt)}
      </div>  {/* Notification Messae Div End Here */}         

          
      </div>    
              
      ))}        
  
  </div>
      
            
    

      </>
      )  

      :""} 

     </div> 
  )
}

export default AdminDashboardHeader;