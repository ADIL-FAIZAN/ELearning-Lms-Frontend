"use client"

import AdminDashboardHeader from "../AdminDashboardHeader"
import AdminSidebar from "../AdminSidebar"
import Allusers from "./Allusers"


type Props = {}

const MainAdminAllUsers = (props: Props) => {


  return (
    
    <div className="grid grid-cols-12">
         
   <div className="col-span-2">
   <AdminSidebar />
   </div>
   
   <div className="col-span-10 xl:px-10">
    
   <AdminDashboardHeader />       
   <Allusers/>
   
    </div>
   
   
    </div>
  
  )
}

export default MainAdminAllUsers