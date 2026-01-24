"use client"
import React from 'react'
import AdminSidebar from '../AdminSidebar'
import { useGetAllCoursesQuery } from '../../../../redux/features/courseApi'
import AllCourses from './AllCourses'
import AdminDashboardHeader from '../AdminDashboardHeader'

type Props = {}

const MainAllCourses = (props: Props) => {



    return (
      
   <div className="grid grid-cols-12">
         
   <div className="col-span-2">
   <AdminSidebar />
   </div>
   
   <div className="col-span-10  px-10">
   <AdminDashboardHeader />          
   <AllCourses/>
   
    </div>
   
   
    </div>

    
    )
}

export default MainAllCourses