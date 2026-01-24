import AdminDashboardHeader from "./AdminComponents/AdminDashboardHeader"
import AdminSidebar from "./AdminComponents/AdminSidebar"
import EditCategories from "./AdminComponents/EditCategories"
import EditHero from "./AdminComponents/EditHero"


type Props = {}

const MainEditCategories = (props: Props) => {


  return (
  <div className="grid grid-cols-12">
         
   <div className="col-span-2 max-md:col-span-1">
   <AdminSidebar />
   </div>
   
   <div className="col-span-10 max-md:col-span-11 min-md:px-10">
  <AdminDashboardHeader  />
  <EditCategories/>
   
    </div>
   
   
    </div>
  )
}

export default MainEditCategories