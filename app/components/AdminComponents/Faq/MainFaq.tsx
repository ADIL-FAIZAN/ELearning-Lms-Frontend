import AdminSidebar from '../AdminSidebar'
import EditFaq from './EditFaq'
import AdminDashboardHeader from '../AdminDashboardHeader'

type Props = {}

const MainFaq = (props: Props) => {
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
   <div className="flex justify-center font-bold text-xl md:hidden"> FAQ's</div> 
  <EditFaq/>
   
  </div>
   
   
      </div>
      </>
  )
}

export default MainFaq