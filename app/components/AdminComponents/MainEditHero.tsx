import AdminDashboardHeader from "./AdminDashboardHeader"
import AdminSidebar from "./AdminSidebar"
import EditHero from "./EditHero"


type Props = {}

const MainEditHero = (props: Props) => {


  return (

  <>
  
  <div className="w-full max-md:pr-3 md:px-10">
 <AdminDashboardHeader />  
 </div>

  <div className="grid grid-cols-12">
         
   <div className="col-span-1 md:col-span-2">
   <AdminSidebar />
   </div>
   
   <div className="col-span-11 mt-5 px-10">
           
  <EditHero/>
   
    </div>
   
    </div>
      
    </>   
  )
}

export default MainEditHero;