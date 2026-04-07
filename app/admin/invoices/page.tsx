import AdminDashboardHeader from "../../components/AdminComponents/AdminDashboardHeader";
import AdminSidebar from "../../components/AdminComponents/AdminSidebar"
import AllInvoices from "../../components/AdminComponents/AllInvoices"

type Props = {

  

}

export const metadata = {

  title:"Admin All Invoices",
  description:"ELearning is a platform...",
  keywords:"Programming, MERN, Redux, ML"

};





const page = (props: Props) => {
 
 

    return (

      <>

      <div className="w-full max-md:pr-3 md:px-10">
      <AdminDashboardHeader />  
      </div>
        
     <div className='grid grid-cols-12'>
          
        <div className='col-span-2 bg-[#111C43]!'>
        <AdminSidebar /> 
        </div>    

        <div className='col-span-10 px-10'>     
        <AllInvoices isDashboard={false} />
        </div> 

      </div>
            
      </>
    
  )
}

export default page