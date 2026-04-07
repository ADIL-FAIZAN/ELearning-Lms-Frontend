"use client"

import AdminDashboardHeader from "../AdminDashboardHeader"
import AdminSidebar from "../AdminSidebar"
import Allusers from "./Allusers"


type Props = {}

const MainAdminAllUsers = (props: Props) => {


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

   <div className="flex justify-center font-bold text-xl md:hidden"> All Users</div>     

   <Allusers/>
   
    </div>
   
   
    </div>
  
    </>
  )
}

export default MainAdminAllUsers