"use client"

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useUpdateUserPsswordMutation } from "../../redux/features/UserApi/userApi";

type Props = {}

const ChangingPassword = (props: Props) => {

  const [toggle0, settoggle0] = useState(false);
  const [toggle1, settoggle1] = useState(false);
  const [toggle2, settoggle2] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updateUserPssword,{isSuccess,isError,isLoading,error}] = useUpdateUserPsswordMutation();


  const handleSubmit = async (e:any) => {
  e.preventDefault();

    if (oldPassword === "" || newPassword === "" || confirmPassword ==="") {
      
      toast.error("Enter All Fields!");

    } else if (newPassword !== confirmPassword){
      toast.error("Your new password Not Equal To confirm new Password!");

    } else {
      
      await updateUserPssword({oldPassword,newPassword}); 
   
    }; 
      
    
  };

  useEffect(() => {
  
  if(isSuccess) {
  
    toast.success("User Password Updated Successfully");

   }

    if (isError) {
      
    const errorData = error as any;
    toast.error(errorData?.data?.message);
   
    }
        
   },[isError,isSuccess])



  return (
      <>
      
       <form className='flex flex-col gap-2' onSubmit={handleSubmit} >

       <label className='text-white'>Enter your old password</label>
                      
              <div className='relative'>
              <input className='mt-1 w-full border-2 pl-2 bg-white text-black border-gray-200 h-[40px] rounded'
                value={oldPassword}
                type={toggle0 == false ? "password" : "text"}
                onChange={(e) => setOldPassword(e.target.value)}
              />

            <div className='absolute right-4 cursor-pointer bottom-2 text-[25px] text-gray-700' onClick={() => settoggle0(!toggle0)}>
            {toggle0 == false ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
            </div>

              <label className='mt-5 text-white'>Enter your new password</label>
                      
        <div className='relative'>
        <input className='mt-1 w-full border-2 pl-2 bg-white text-black border-gray-200 h-[40px] rounded text-gray-700'

            type={toggle1 == false ? "password" : "text"}
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}

              />

              <div className='absolute right-4 cursor-pointer bottom-2 text-[25px] text-gray-700' onClick={() => settoggle1(!toggle1)}>

                {toggle1 == false ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}

              </div>
              </div>
              
        <label className='mt-5 text-white'>Re-Enter your new password</label>
                      
    <div className='relative'>
              <input className='mt-1 w-full border-2 pl-2 bg-white text-black border-gray-200 h-[40px] rounded'
               value={confirmPassword}
                type={toggle2 == false ? "password" : "text"}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <div className='absolute right-4 cursor-pointer bottom-2 text-[25px] text-gray-700' onClick={() => settoggle2(!toggle1)}>

                {toggle1 == false ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}

            </div>
            </div>

        <div className="w-full flex justify-center mt-10">
            
       <button className="w-full h-[35px] rounded flex items-center justify-center cursor-pointer border-1 border-white text-white" type='submit'>Update</button>

       </div>

         </form>     
      </>
  
  )
}

export default ChangingPassword;