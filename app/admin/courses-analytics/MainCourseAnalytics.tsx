import AdminDashboardHeader from '../../components/AdminComponents/AdminDashboardHeader';
import AdminSidebar from '../../components/AdminComponents/AdminSidebar';
import CourseAnalytics from '../../components/AdminComponents/CourseAnalytics';
import React from 'react'

type Props = {}

const MainCourseAnalytics = (props: Props) => {


  return (
  
   <div className="grid grid-cols-12">
         
   <div className="sm:col-span-2 max-sm:col-span-1">
   <AdminSidebar/>
   </div>
   
   <div className="sm:col-span-10 max-sm:col-span-11 px-5 sm:px-10">
           
   <AdminDashboardHeader />      
  <CourseAnalytics/>
   
    </div>
   
   
    </div>
  
  )
}

export default MainCourseAnalytics;