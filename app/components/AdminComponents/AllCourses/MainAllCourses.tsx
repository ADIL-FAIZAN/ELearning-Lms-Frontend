"use client"
import React from 'react'
import AdminSidebar from '../AdminSidebar'
import { useGetAllCoursesQuery } from '../../../../redux/features/courseApi'
import AllCourses from './AllCourses'
import AdminDashboardHeader from '../AdminDashboardHeader'

type Props = {}

const MainAllCourses = (props: Props) => {



    return (
      
    <>
    
    <div className="w-full max-md:pr-3 md:px-10">
    <AdminDashboardHeader />  
    </div>

   <div className="grid grid-cols-12">
         
   <div className="col-span-2">
   <AdminSidebar />
   </div>
   
   <div className="col-span-10 xl:px-10">
                 
   <div className="flex justify-center font-bold text-xl md:hidden"> All Courses</div>              
   <AllCourses/>
   
    </div>
   
    </div>

    </>
    )
}

export default MainAllCourses