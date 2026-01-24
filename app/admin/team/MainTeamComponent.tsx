import AdminSidebar from '../../components/AdminComponents/AdminSidebar'
import React from 'react'
import AllTeam from './AllTeam'
import AdminDashboardHeader from '../../components/AdminComponents/AdminDashboardHeader'

type Props = {}





const MainTeamComponent = (props: Props) => {
  
  
    return (
    <div className=' grid grid-cols-12'>
          
          <div className='col-span-2 bg-[#111C43]!'>
          <AdminSidebar /> 
          </div>    

            <div className='col-span-10 px-10'>   

          <AdminDashboardHeader  />    
          <AllTeam/>
          </div> 

      </div>
  )


}

export default MainTeamComponent