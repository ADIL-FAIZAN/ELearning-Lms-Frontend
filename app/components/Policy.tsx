"use client"

import React, { useState } from 'react'
import Footer from './Footer'
import Header from './Header'

type Props = {}

const Policy = (props: Props) => {

 const [route, setRoute] = useState("Login");
 const [open,setOpen] = useState(false);
 const [activeItem, setActiveItem] = useState(3);  



  return (
    
    <>
    
    <Header open={open} setOpen={setOpen} activeItem={activeItem} route={route} setRoute={setRoute} />   
        <div className='min-h-[600px] py-10'>
              
          <div className='flex justify-center font-bold font-Poppins text-[20px] leading-[35px] sm:text-3xl lg:text-3xl text-white !leading-[60px]tracking-tight'>
          <div>
          <p>Platform Terms And Conditions</p>
          </div>
          </div>

          <div className='px-5 min-md:px-20 mt-10'>
          <div className='line-break text-[18px]'>  
         Welcome to ELearning. By accessing or using our platform, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully before using our services.             
          </div> 

          <div className='line-break text-[18px] mt-10'>  

          1. Acceptance of Terms

          By registering, accessing, or using ELearning, you acknowledge that you have read, understood, and agreed to these Terms and Conditions. If you do not agree with any part of these terms, you must not use the platform.            
                      
          </div>


          <div className='line-break text-[18px] mt-10'>  
                      
          2. About ELearning

          ELearning is a Learning Management System (LMS) that allows administrators to create, manage, and sell online courses. The platform provides users with access to educational content for learning and skill development purposes only.

          </div>        

          <div className='line-break text-[18px] mt-10'>  
         
          3. User Accounts

          To access certain features of ELearning, you may be required to create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. ELearning reserves the right to suspend or terminate accounts found to be in violation of these terms.
                      
          </div>         

        <div className='line-break text-[18px] mt-10'>  
         
         4. Course Access and Usage
         All courses and learning materials available on ELearning are for personal and non-commercial use only, unless explicitly stated otherwise. Users are not permitted to copy, distribute, resell, or share course content without prior written permission from ELearning or the respective content owner.            
        </div>         

         <div className='line-break text-[18px] mt-10'>  
         5. Payments and Refunds

         Course prices are clearly displayed on the platform and may be subject to change. All payments must be made through approved payment methods. Refund policies, if applicable, will be clearly communicated at the time of purchase. ELearning reserves the right to refuse or cancel any transaction at its discretion.        
         </div>     



          <div className='line-break text-[25px] mt-10 font-bold'>Adil Faizan</div>
          <div className='line-break text-[18px] font-bold'>Founder and CEO of ELearning.</div>         
          </div>

          </div>
        <Footer/>  
        </>
    
  
  
  
  )
}

export default Policy