"use client"

import Image from 'next/image';
import { AiOutlineLogout } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { SiCoursera } from 'react-icons/si';
import { useLogoutQuery } from '@/redux/features/auth/authApi';
import { signOut } from "next-auth/react";
import { useState } from 'react';
import Link from 'next/link';

interface Props { 

    active: number,
    setActive: (value:number)=> void;
    user:any

};

const ProfileSidebar = ({user,active,setActive }: Props) => {

  const [logout, setLogout] = useState(false);
  const { isSuccess, isError, isLoading } = useLogoutQuery(undefined, {

  skip: !logout ? true : false

  });

  const handleLogout = async () => {
  
    try {

    setLogout(true);
    await signOut();
      
    }catch(err){
        
    console.log(err)

    }; 

  };

  return (
    
    <div className={`bg-gray-800 flex flex-col gap-7 rounded h-[400px] w-full min-xl:w-[250px] sm:w-full py-5 px-2`}>
  
    <div className={`${active === 1? `bg-gray-600` :"bg-gray-800"} hover:bg-gray-600  cursor-pointer px-[10px] rounded-lg h-[40px] flex items-center gap-3`} onClick={()=>{setActive(1)}}>
  
    <div>
    
            <Image
            alt=""
            src={user?.avatar ? user?.avatar?.url : "/assests/avatardefault.jpg"}
            width={25}
            height={25}
            className="w-[25px] h-[25px]  cursor-pointer  rounded-full"
            style={{ border:"2px solid #37a39a"}}  
    />
    </div>                            
    <div className='max-sm:hidden'>My Account</div>                          
                              
    </div>
                            
    <div className={`${active === 2? `bg-gray-600` :"bg-gray-800"} hover:bg-gray-600  cursor-pointer px-[10px] rounded-lg h-[40px] flex items-center gap-3`} onClick={()=>{setActive(2)}}>
  
    <div>
    <RiLockPasswordLine size={20} className="text-white" />         
    </div>                            
    <div className='max-sm:hidden'>Change Password</div>                          
                              
    </div>
  
     <div className={`${active === 3? `bg-gray-600` :"bg-gray-800"} hover:bg-gray-600  cursor-pointer px-[10px] rounded-lg h-[40px] flex items-center gap-3`} onClick={()=>{setActive(3)}}>
  
    <div>
     <SiCoursera size={20} className="text-white" />       
   </div>                            
   <div className='max-sm:hidden'>Enrolled Courses</div>                          
                              
   </div>
  
      {user.role === "admin" ? (

        <Link href={"/admin"}>
          <div className= "hover:bg-gray-600 bg-gray-800 cursor-pointer px-[10px] rounded-lg h-[40px] flex items-center gap-3">
  
    <div>
    <SiCoursera size={20} className="text-white" />       
   </div>                            
   <div className='max-sm:hidden'>Admin Dashboard</div>                          
                              
   </div>    
   </Link>     

      ):""}   





   <div className={`${active === 4 ? `bg-gray-600` : "bg-gray-800"} hover:bg-gray-600 px-[10px] cursor-pointer rounded-lg h-[40px] flex items-center gap-3`} onClick={() => { setActive(4); handleLogout()}}>
  
    <div>
  <AiOutlineLogout size={20} className="text-white"/>      
  </div>
        
   <div className='max-sm:hidden'>Logout</div>                                                        
   </div>
   </div> 
  
  )
}

export default ProfileSidebar;