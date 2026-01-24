import AdminSidebar from '../components/AdminComponents/AdminSidebar'
import AdminDashboard from '../components/AdminComponents/AdminDashboard'

type Props = {}

const MainAdminComponent = (props: Props) => {


    return (
      <>
    
      <div className=' grid grid-cols-12'>
          
          <div className='col-span-1 min-xl:col-span-2'>
          <AdminSidebar/> 
          </div>    

          <div className='max-xl:col-span-11 col-span-10 px-10 h-fit'>     
          <AdminDashboard/>
          </div> 

      </div>
  </>
  )
}

export default MainAdminComponent