import AdminSidebar from '../AdminSidebar'
import EditFaq from './EditFaq'
import AdminDashboardHeader from '../AdminDashboardHeader'

type Props = {}

const MainFaq = (props: Props) => {
  return (
<div className="grid grid-cols-12">
         
   <div className="col-span-2">
   <AdminSidebar />
   </div>
   
   <div className="col-span-10 px-10">
  <AdminDashboardHeader  />     
  <EditFaq/>
   
    </div>
   
   
    </div>
  )
}

export default MainFaq