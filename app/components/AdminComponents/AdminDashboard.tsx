"use client"

import React, { useEffect, useState } from 'react'
import AdminDashboardHeader from './AdminDashboardHeader'
import UserAnalytics from '../../admin/users-analytics/UserAnalytics'
import OrdersAnalytics from '../../admin/orders-analytics/OrdersAnalytics';
import AllInvoices from './AllInvoices';
import { useGetOrdersAnalyticsQuery, useGetUsersAnalyticsQuery } from '../../../redux/features/analyticsApi';
import AdminDashboardWidgets from './AdminDashboardWidgets';


const AdminDashboard = () => {

 const { data:UserAnalyticData,isLoading:UsersAnalyticsLoading,isSuccess:UsersAnalyticsSuccess } = useGetUsersAnalyticsQuery({});
 const { data:OrderAnalyticData,isLoading:OrdersAnalyticsLoading,isSuccess:OrderAnalyticsSuccess } = useGetOrdersAnalyticsQuery({});

 const isloading = UsersAnalyticsLoading || OrdersAnalyticsLoading;

  return (
    <>
      {/* bg-[#111C43] */}
  <AdminDashboardHeader/>
  <div className='grid grid-cols-12 gap-5 h-full'>
     
  <div className='lg:col-span-9 max-lg:hidden h-[300px]'>      
  <UserAnalytics isDashboard={true} />
  </div>    
 
 <div className='max-lg:col-span-12 lg:col-span-3 w-full h-[300px]'> 
 <AdminDashboardWidgets/>       
 </div> 
        
 </div>  {/* 1 grid End Here */}  
      
        <div className='grid grid-cols-12 gap-5 mt-10 mb-10'>
  
        
        <div className='lg:col-span-8 max-lg:hidden items-start h-[300px]'>
        <OrdersAnalytics isDashboard={true} />
        </div>    
 
        <div className='max-lg:col-span-12 lg:col-span-4 h-[340px]'>
          {!isloading ? (<>
          
          <div className='w-full '>
          <p className='text-[18px] font-bold'>Recent Transactions</p>
          </div> 

          </>):""}
      
          
        <div className='mt-3'>
        <AllInvoices isDashboard={true} />

        </div>
        </div>
      
       </div> {/* 2 grid End Here*/}  


  </>
  )
}

export default AdminDashboard;