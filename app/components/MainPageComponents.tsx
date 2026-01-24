"use client"

import { useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import Login from "./Auth/login";
import { useSelector } from "react-redux";
import Courses from "./Courses";
import HomeText from "./HomeText";
import Reviews from "./Reviews";
import Faq from "./Faq";
import Footer from "./Footer";
import { useGetAllCoursesQuery } from "../../redux/features/courseApi";
import { useGetLayoutQuery } from "../../redux/features/layoutApi";
import Loader from "./Loader/Loader";


interface Props {};

const MainPageComponents = (props: Props) => {

 const [route, setRoute] = useState("Login");
 const [open,setOpen] = useState(false);
 const [activeItem, setActiveItem] = useState(0);  
 const user = useSelector((state:any) => state.auth);  
 const {isLoading:GetAllCoursesLoading,data:courseData } = useGetAllCoursesQuery({});
 const { isLoading:BannerDataLoading } = useGetLayoutQuery("Banner");  
 const {isLoading:FAQDataLoading} = useGetLayoutQuery("FAQ");      
 const isLoading = GetAllCoursesLoading || BannerDataLoading || FAQDataLoading;
    
    
return (
 <>
        
  <Header open={open} setOpen={setOpen} activeItem={activeItem} route={route} setRoute={setRoute} />  
  
  {!isLoading ? (
  <>
              
  <Hero /> 
  <div className="px-20 max-xl:px-5 h-full">
 
  <Courses/> 
  <HomeText/>    
  <Reviews/>
  
  <div className="mt-10">
  <Faq isPage={false} />
  </div>
  </div>      
  
  <div className="mt-10">
  <Footer/>      
  </div>

        </>) : (
            
        <>
        
        <Loader/>
        
        </>
        
        )}           

 </>
 )    
};

export default MainPageComponents;