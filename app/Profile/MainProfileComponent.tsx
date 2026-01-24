"use client"

import React, { useState } from 'react'
import ProfileSidebar from './ProfileSidebar';
import ProfileMainContent from './ProfileMainContent';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import UserProtectedRoute from '../hooks/UserProtectedRoute';
import Footer from '../components/Footer';



type Props = {}

const MainProfileComponent = (props: Props) => {

  const [active, setActive] = useState(1);  
  const [route, setRoute] = useState("Login");
  const [open,setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(6);  
  const { user } = useSelector((state:any) => state?.auth);

  
  return (
 <>
 <UserProtectedRoute>
        
  <Header open={open} setOpen={setOpen} activeItem={activeItem} route={route} setRoute={setRoute} />  
        
  <div className='px-3 lg:px-25 pb-20 pt-10'>
  <div className='w-full grid items-start grid-cols-12'>           
  <div className='rounded h-[330px] w-full col-span-3'>           
  <ProfileSidebar user={user} active={active} setActive={setActive} />             
  </div>  
                  
  <div className='rounded w-full h-full col-span-9  '>           
  <ProfileMainContent user={user} active={active} />
  </div>  
  </div>        
  </div>
  <Footer/>        
  </UserProtectedRoute>         
  </>    
    
  )
}

export default MainProfileComponent