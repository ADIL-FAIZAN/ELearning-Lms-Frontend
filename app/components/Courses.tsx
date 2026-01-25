import React from 'react'
import CourseCard from './CourseCard'
import HomeText from './HomeText'
import { useAllCoursesDataQuery, useGetAllCoursesQuery } from '@/redux/features/courseApi'

type Props = {}

const Courses = (props: Props) => {

const { data:AllCoursesData,isLoading:AllCoursesDataLoading } = useAllCoursesDataQuery(undefined,{refetchOnMountOrArgChange:true});

const AllCourses = AllCoursesData?.AllCoursesData;

  return (
    
      <div className='w-full'>
          
          {/* Courses Page header */}
          <div className='flex justify-center font-bold w-full font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl text-white !leading-[60px]tracking-tight'>
          <div>
        
           <div className='flex max-md:flex-col min-lg:gap-2 max-md:items-center max-md:justify-center'>     
              <p className='max-md:inline-block'>Expand Your Career</p>
              <span className="text-gradient min-md:inline-block">Opportunity </span>
       </div>
              

              <div className='flex justify-center max-sm:ml-7  min-sm:gap-2 mt-5'>     
             <div className='min-sm:flex min-sm:gap-2'>
             <div className='w-fit max-sm:hidden'>Opportunity </div>
              <div className='max-sm:w-[240px]'>With Our Courses  </div>
              </div>
          
          </div>
          </div>
          </div>      
          
          {/* Courses Card visible Here */}
    
       
              <div className='max-lg:flex max-lg:flex-col  items-center'>
      <div className='grid max-md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3   md:gap-5  mt-20 h-full'>  
        
        {AllCourses && AllCourses?.map((course:any) => {
        
          return (
         <div className='mt-5'>   
         <CourseCard {...course} /> 
         </div>
          )
           
          
        })}  
         
        </div>
        </div>
      </div>
  
  
  )
}

export default Courses