"use client"

import { Component, useEffect, useState } from "react";
import NavItem from "./NavItem";
import Link from "next/link";
import { useTheme } from "next-themes"; 
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useLogoutQuery, useSocialAuthMutation } from '../../redux/features/auth/authApi';

interface Props{ 
     
 open:boolean,
 setOpen: (open: boolean) => void,
 activeItem: number,
 route: string,
 setRoute: (open: string) => void,
  
 };

const Header = ({open,setOpen,activeItem,route,setRoute}: Props) => {

 const [active, setActive] = useState(false);
 const [openSidebar, setOpenSidebar] = useState(false);
 const [authenticationPopUp, setAuthenticationPopUp] = useState(false);
 const { user } = useSelector((state: any) => state?.auth);     
 const { data } = useSession(); 
 const [socialAuth, { isError, isSuccess, error }] = useSocialAuthMutation();
 const [logout, setLogout] = useState(false);
 const { } = useLogoutQuery(undefined, { skip: !logout ? true : false });   
     
  
  useEffect(() => {
    
   if (!user) {
  
   if (data) {
  
     const user = {
     
     name: data?.user?.name,
     email: data?.user?.email,
     image: data?.user?.image,
    
     };  

    socialAuth(user);
     
 };
    };

  }, [data,user]);


  //Based on the user Scroll change the scroll at once
  useEffect(() => {
    
    const handleScroll = () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
    

  return (

    <div className="bg-gray-900 w-full h-[75px] flex justify-center items-center px-3 border-b duration-300">  
    <div className="w-[95%] h-[50px] flex items-center justify-between">
    
    <div className="text-white font-semibold font-Poppins text-[19px]">
    <Link href={"/"}>ELearning</Link>
    </div>
    
    <div className="max-lg:hidden">
    <NavItem user={user} isMobile={false} activeItem={activeItem} setOpenSidebar={setOpenSidebar} setAuthenticationPopUp={setAuthenticationPopUp} setOpen={setOpen} open={open} route={route } setRoute={setRoute} />  
    </div>    
    
    <div className="lg:hidden"> 
          
    <HiOutlineMenuAlt3
    className="cursor-pointer text-white"
    size={23}
    onClick={() => setOpenSidebar(true)}
    />   
    </div>     

    {openSidebar && (
          
    <div className="w-[70%] fixed right-0 top-0 h-[500px] bg-gray-600 z-[99999] sm:bg-gray-700 rounded">
      
        <div>
               <RxCross1
               size={22}
               className="cursor-pointer absolute top-4 right-2"
               onClick={() => setOpenSidebar(false)}
               />   
        </div>       
    
            <NavItem user={user} isMobile={false} activeItem={activeItem} setOpenSidebar={setOpenSidebar} setAuthenticationPopUp={setAuthenticationPopUp} setOpen={setOpen} open={open} route={route } setRoute={setRoute} />       

    </div>
    )}    

    </div>
    </div>
        
     )
 }

 export default Header;