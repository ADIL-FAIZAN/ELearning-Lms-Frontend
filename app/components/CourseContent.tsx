"use client"

import React, { useEffect, useState } from 'react'
import CourseVideo from './AdminComponents/CreateCourse/CourseVideo'
import ValidCourseContentList from './ValidCourseContentList'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import CourseContentSubOptions from './CourseContentSubOptions'
import { useSelector } from 'react-redux'

type Props = {

  courseContentData: any,
  courseId: any,
  refetch: any,
  course:any

}

const CourseContent = ({courseContentData,courseId,refetch,course}: Props) => {

  const [activeContentIdx, setActiveContentIdx] = useState<any>(0);
  const { user } = useSelector((state: any) => state?.auth);
  const [contentData, setContentData] = useState<any[]>([])

  useEffect(() => {
  
  setContentData(courseContentData);
  
  }, [courseContentData]);

  
  const prevLessonHandler = () => {
  
  if (activeContentIdx > 0) {
  
  setActiveContentIdx((prev: number) => prev - 1);
  
  };
  
  };


   const nextLessonHandler = () => {
  
    if (activeContentIdx < contentData.length-1) {
     
    setActiveContentIdx((prev:number) => prev + 1);

    };
  };


  return (
    
    <div className='xl:grid xl:grid-cols-12 px-5 lg:px-15 my-5 min-h-screen'>
      
      <div className='xl:col-span-8 h-[600px] lg:h-[500px]'>
      
      <div className='flex flex-col'>
                     
      <div className='w-full h-[300px] xl:h-[500px]'>
      <CourseVideo videoUrl={contentData && contentData[activeContentIdx]?.videoUrl || [{}]} />
      </div>
      
      <div className='flex justify-between mt-[20px]'>
          
        <div className={` ${
        activeContentIdx === 0 && "!cursor-no-drop opacity-[.8]" } w-[150px] flex justify-center items-center h-[40px] bg-blue-700 text-center text-[#fff] rounded-xl cursor-pointer `} onClick={prevLessonHandler} >
        <AiOutlineArrowLeft className="mr-2" />      
        Prev Lesson
        </div>    

        <div
        className={` ${ activeContentIdx ===  contentData?.length - 1 && "!cursor-no-drop opacity-[.8]" }  w-[150px] flex justify-center items-center h-[40px] bg-blue-700 text-center text-[#fff] rounded-xl cursor-pointer`} onClick={nextLessonHandler}>
        Next Lesson
        <AiOutlineArrowRight className="ml-2" />
        </div>

        </div>    
      
      <div className='font-bold text-[18px] font-poppins my-5'>{contentData && contentData[activeContentIdx]?.title}</div>   
      <CourseContentSubOptions user={user} VideoData={contentData&&contentData || [{}]} videoIndex={activeContentIdx} course={course} courseId={courseId} refetch={refetch} />
      </div> 
        
      </div>  
    
      <div className='xl:col-span-4 mt-25 sm:mt-0'>
       <div className='w-full px-0 lg:px-10'>
       <ValidCourseContentList courseData={contentData || [{}]} setActiveContentIdx={setActiveContentIdx} />
       </div>
      </div>  
    
    </div>
  
  )
}

export default CourseContent