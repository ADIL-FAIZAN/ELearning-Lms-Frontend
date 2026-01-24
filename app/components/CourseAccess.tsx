"use client"

import { useLoadUserQuery } from '../../redux/features/api/apiSlice'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Loader from './Loader/Loader'
import CourseContent from './CourseContent'
import { useCourseContentQuery } from '../../redux/features/courseApi'
import Header from './Header'

type Props = {

courseId:number

}


const CourseAccess = ({courseId}: Props) => {

  const [route, setRoute] = useState("Login");
  const [open,setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1); 
  const {data:userData,error:loadUserError,isLoading:userloading} = useLoadUserQuery(undefined,{});
  const {data:courseContent, isLoading:courseContentLoading,refetch:refetchCourseContent} = useCourseContentQuery(courseId,{refetchOnMountOrArgChange:true});
  const courseContentData  = courseContent?.CourseContent


    console.log("Load User Error:",loadUserError)
    console.log("UserLoading:",userloading)  
    console.log("User:", userData)
    console.log("Course Content Loading:",courseContentLoading) 
    console.log("coursecontentdata:",courseContentData)


    useEffect(() => {
    
    if (userData !== undefined && !userloading && courseContentData !== undefined && !courseContentLoading) {
          
        const user = userData?.User;

        const isPurchased = user.courses.find((eachCourse: any) => {
            
        if (eachCourse.courseId == courseId) return true;  

        });  
        

        if (!isPurchased) {
        redirect("/");
        };
        
        } //data if condition end here
        
        if (loadUserError) {
        redirect("/");
        };

    }, [userData,loadUserError]); 


    return (
    
        <>
    
     <Header open={open} setOpen={setOpen} activeItem={activeItem} route={route} setRoute={setRoute} /> 
    
            {userloading && courseContentLoading ? (
                
            <Loader />
            
            ) : (
                
            <>
            
            <CourseContent courseContentData={courseContentData?.courseData} course={courseContentData}  courseId={courseId} refetch={refetchCourseContent} />
            
             </>
            
             )}
        
        </>
 
    )
}

export default CourseAccess