"use client"

import { useLoadUserQuery } from '../../redux/features/api/apiSlice';
import { useAllCoursesDataQuery } from '../../redux/features/courseApi';
import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard';
import Loader from './Loader/Loader';

type Props = {}

const EnrolledCourses = (props: Props) => {

   const {data:UserData,refetch:refetchUserData} = useLoadUserQuery(undefined,{});
   const {data:AllCoursesData,isLoading:AllCoursesDataLoading } = useAllCoursesDataQuery({}); 
   const [userCourses, setUserCourses] = useState([]);
   const AllCourses = AllCoursesData?.AllCoursesData; 
    
  
  useEffect(() => {

    const filteredCourses = AllCourses?.filter((eachCourse: any) => {
    
      if (UserData?.User?.courses?.find((userCourse:any)=>(userCourse?.courseId === eachCourse?._id))) {
    
      return true;
    
      } else {

      return false;
      
      }

    });
    
    setUserCourses(filteredCourses);

  }, [AllCourses,UserData]);



  return (
    
    <>
      {AllCoursesDataLoading ? (
        <>
      <Loader/>
        </>
      
      ) : (
        
    <>   

   {userCourses?.length > 0 ? (<>
     
   <div className='grid max-md:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 max-sm:w-fit w-full gap-5 h-full'> 
        
   {userCourses?.map((course: any) => (
     
   <CourseCard EnrolledCourses={true} {...course} />               
                         
   ))}           
                            
   </div> 

      </>
      
      ):(
      <div className='w-full flex justify-center items-center h-[200px]'>
      
      <div className='ml-6'>           
      <p className='text-[20px]'>You do not purchased any course! </p>      
      </div> 
      </div>
      
      )}

  
  </>)}
    
  </>
  
  )
}

export default EnrolledCourses