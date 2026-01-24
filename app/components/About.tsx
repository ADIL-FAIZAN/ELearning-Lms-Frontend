"use client"

import React, { useState } from 'react'
import Header from './Header';
import Footer from './Footer';

type Props = {}

const About = (props: Props) => {

 const [route, setRoute] = useState("Login");
 const [open,setOpen] = useState(false);
 const [activeItem, setActiveItem] = useState(2); 



  return (
     <>
        <Header open={open} setOpen={setOpen} activeItem={activeItem} route={route} setRoute={setRoute} />   
        <div className='min-h-[600px] py-10'>
              
          <div className='flex justify-center font-bold font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl text-white !leading-[60px]tracking-tight'>
          <div>
          <p>What is <span className="text-gradient">Elearning?</span></p>
          </div>
          </div>

          <div className='px-5 min-md:px-20 mt-10'>
          <div className='line-break text-[18px]'>  
                      
          Elearning is a modern Learning Management System (LMS) designed to make online education simple, accessible, and effective for everyone. Our platform allows administrators and instructors to create, manage, and sell high-quality courses, while learners can easily enroll, learn at their own pace, and track their progress. Elearning focuses on delivering a smooth and engaging digital learning experience that bridges the gap between knowledge and opportunity.       
          </div> 

          <div className='line-break text-[18px] mt-10'>  

          At Elearning, we believe education should be flexible, scalable, and available to all. Our platform is built to support interactive learning, structured course content, and seamless course management. From secure authentication to real-time updates and intuitive dashboards, Elearning empowers admins to grow their educational business while providing students with a reliable and user-friendly learning environment.            
                      
          </div>


          <div className='line-break text-[18px] mt-10'>  
                      
          Elearning was founded by Adil Faizan, the Founder and CEO, with a clear mission to transform how people learn online. With a strong focus on innovation and quality, Elearning aims to create a trusted platform where knowledge is shared, skills are developed, and careers are built. Our goal is to continuously evolve, integrate modern technologies, and deliver an LMS that meets the needs of today’s digital learners and educators.


          </div>        

          <div className='line-break text-[18px] mt-10'>  
         
          At Elearning, we are committed to maintaining quality, transparency, and continuous improvement. Our mission is to empower individuals and organizations through education by providing a dependable and evolving LMS platform. We strive to build long-term value for our users and contribute positively to the digital learning landscape.            
                      
          </div>         

          <div className='line-break text-[25px] mt-10 font-bold'>Adil Faizan</div>
          <div className='line-break text-[18px] font-bold'>Founder and CEO of ELearning.</div>         
          </div>

          </div>
        <Footer/>  
        </>
  )
}

export default About