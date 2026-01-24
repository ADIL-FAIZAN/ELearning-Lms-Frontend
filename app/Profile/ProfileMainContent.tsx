"use client"

import React, { useEffect, useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai';
import ChangingPassword from './ChangingPassword';
import Image from 'next/image';
import axios from 'axios';
import { useUpdateUserNameMutation } from '@/redux/features/auth/authApi';
import { useUpdateUserAvatarMutation } from '@/redux/features/UserApi/userApi';
import toast from 'react-hot-toast';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import {useAllCoursesDataQuery} from "../../redux/features/courseApi"
import CourseCard from '../components/CourseCard';
import EnrolledCourses from '../components/EnrolledCourses';


interface Props {

active:number,
user:any  
 
};

const ProfileMainContent = ({ active,user }: Props) => {
  
   const [FullName, setFullName] = useState(user?.name); 
   const [loadUser, setLoadUser] = useState(false);
   const [UpdateUserName,{isLoading}] = useUpdateUserNameMutation();
   const [updateUserAvatar,{isError,isSuccess}] = useUpdateUserAvatarMutation();
   
  
  
   const handleSubmitUserInfoUpdate = async (e:any) => {
    e.preventDefault();

    const { data } = await UpdateUserName(FullName);
    
    if(data){
    toast.success("User name updated Successfully!");
    };    
  };


  const imageHandler = (e:any) => {
    
  const fileReader = new FileReader();
    
    fileReader.onload = async () => {
    
      if (fileReader.readyState == 2) {
      
      const result = fileReader.result;
      await updateUserAvatar({avatar:result});
      
    };
      };
  
    fileReader.readAsDataURL(e.target.files[0]);

  };


  useEffect(() => {
  
    if (isSuccess) {
    setLoadUser(true);  
    };
 
  }, [isSuccess]);

  
  return (
    
    <div>
      
      {active === 1 ?(
      <>
<div className="flex justify-center items-center max-md:mt-5 w-full h-[150px]">
                 
            <div className="relative rounded-full">
              
              <Image src={user?.avatar ? user?.avatar?.url : "/assests/avatardefault.jpg"}
                height={120}
                width={120}
                className="rounded-full w-[120px] h-[120px] object-cover border-[3px] border-[#37a39a]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-black rounded flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
              <input
              type="file"
              id="image"
              className="hidden"
              onChange={(e)=>imageHandler(e)}
              />
              <label htmlFor="image" className='cursor-pointer'>
                  <AiOutlineCamera/>
                </label>
              </div>
            </div>         
  </div>
<div className=" h-full px-5">
              
  <form onSubmit={(e:any) => { handleSubmitUserInfoUpdate(e) }}> 
          <div className="flex flex-col items-center w-full h-full gap-5 mt-5">  
            
            <div className="w-full sm:w-[55%] 800px:w-[50%]">
              
                  <label className="block pb-2">Full Name</label>
                  <input
                  
                  type="text"
                  className='mt-1 w-full border-2 pl-2 text-black bg-white border-gray-200 h-[40px] rounded'
                  onChange={(e:any)=>setFullName(e.target.value)}
                  value={FullName}
                  />
                </div>

          <div className="w-full sm:w-[55%] 800px:w-[50%] mt-5 sm:mt-0">
                  <label className="block pb-2">Email Address</label>
                  <input
                  readOnly
                  type="text"
                  className='mt-1 w-full border-2 pl-2 text-black bg-white border-gray-200 h-[40px] rounded'                 
                  value={user?.email}
              />
         </div>                
         </div>


<div className="w-full flex justify-center mt-7">
            
<button className="w-[200px] h-[35px] rounded cursor-pointer flex items-center justify-center border-1 border-white text-white" type='submit'>Update</button>

</div>
  </form>


 </div>  
</>
      ) : ""}  {/* active 1 closed Here */}
      
   {/* active 2 closed Here */}   

      {active === 2 ? (
        
      <>
      
   <div className='flex justify-center w-full '>

   <div className='max-sm:w-[300px] min-lg:mt-10 px-5 min-md:px-15 max-md:h-[480px] w-full xl:w-[550px]'>

    <div className='flex justify-center text-xl md:text-3xl text-white font-bold'>Change Password</div>

    <div className='rounded-xl mt-15 w-full'>      
    <ChangingPassword/>       
    </div> 
    </div> 
    </div> 

    </>
      ):""}

      
         {/* active 2 closed Here */}   

      {active === 3 ? (
        
      <>
      
   <div className='flex flex-col items-center'>

   <div className='max-sm:w-[300px] max-sm:mt-10 w-full '>

   <div className='flex justify-center h-full text-xl md:text-3xl text-white font-bold mb-5'>Enrolled Courses</div>

  <EnrolledCourses/>
    </div> 
    </div> 

    </>
      ):""}


  </div>
  
  
  )
}

export default ProfileMainContent