"use client"

import { useGetOrdersAnalyticsQuery, useGetUsersAnalyticsQuery } from "@/redux/features/analyticsApi";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from '@mui/material'
import { PiUsersFourLight } from "react-icons/pi";
import { BiBorderLeft } from 'react-icons/bi';
import Loader from "../Loader/Loader";


interface CircularProgressWithLabelProps { 

open:boolean
value:number

};



type Props = {}

const AdminDashboardWidgets = (props: Props) => {

 const { data:UserAnalyticData,isLoading:UsersAnalyticsLoading,isSuccess:UsersAnalyticsSuccess } = useGetUsersAnalyticsQuery({});
 const { data:OrderAnalyticData,isLoading:OrdersAnalyticsLoading,isSuccess:OrderAnalyticsSuccess } = useGetOrdersAnalyticsQuery({});
 const [UsersWidgetsData, setUsersWidgetsData] = useState<any>({});
 const [OrdersWidgetsData, setOrdersWidgetsData] = useState<any>({});
 const UserAnalyticsData = UserAnalyticData?.userAnalytics?.last12Months;
 const OrderAnalyticsData = OrderAnalyticData?.OrderAnalytics?.last12Months;
 const isloading = UsersAnalyticsLoading || OrdersAnalyticsLoading; 

    
  useEffect(() => {
    
  if (UserAnalyticData && OrderAnalyticsData) {
       
  const currentMonthUsersData =  UserAnalyticsData[UserAnalyticsData?.length - 1];   
  const currentMonthOrdersData = OrderAnalyticsData[OrderAnalyticsData?.length - 1]; 
  
  const previousMonthUsersData = UserAnalyticsData[UserAnalyticsData?.length - 2];       
  const previousMonthOrdersData = OrderAnalyticsData[OrderAnalyticsData?.length - 2];         
      
  
    let Orderdenominator = 0; 
      
    if (previousMonthOrdersData?.count === 0) {  
    Orderdenominator = 100;                         // fresh growth
    }
      
    let Usersdenominator = 0;  
      
    if (previousMonthUsersData?.count === 0) {      
    Usersdenominator = 100;                         // fresh growth
    }  
      
      
      
  const OrdersComaparePercentage = ((currentMonthOrdersData?.count - previousMonthOrdersData?.count) / Orderdenominator) * 100;
  const UsersComaparePercentage = ((currentMonthUsersData?.count - previousMonthUsersData?.count) / Usersdenominator) * 100; 
  
  setOrdersWidgetsData({Orders:currentMonthOrdersData?.count,OrdersComaparePercentage});    
  setUsersWidgetsData({Users:currentMonthUsersData?.count,UsersComaparePercentage});     
    
  };        
      
  }, [UserAnalyticsData,OrderAnalyticsData]);  

    
 const CircularProgressWithLabel = ({ open, value }:CircularProgressWithLabelProps) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};
    
    return (
    <>
        
            {!isloading ? (
            <>
                 
            <div className='min-lg:col-span-3 w-full h-[300px] '>
            
              <div className="800px:pt-[30px] 800px:block flex items-center justify-between">
              <div className="w-full bg-[#111C43] rounded-sm shadow 800px:my-8">
                <div className="flex items-center p-5 justify-between">
                  <div>
                    <BiBorderLeft className="text-[#45CBA0] text-[30px]" />
                    <h5 className="pt-2 font-Poppins text-[#fff]  text-[20px]">
                    {OrdersWidgetsData?.Orders}
                    </h5>
                    <h5 className="py-2 font-Poppins text-[#45CBA0]  text-[20px] font-[400]">
                      Sales Obtained
                    </h5>
                  </div>
                  <div>
                    <CircularProgressWithLabel
                      value={100}
                      open={false}
                    />
                    <h5 className="text-center pt-4">
                       {OrdersWidgetsData?.OrdersComaparePercentage > 0
                        ? "+" + OrdersWidgetsData?.OrdersComaparePercentage?.toFixed(2)
                        : "-" +
                          OrdersWidgetsData?.OrdersComaparePercentage?.toFixed(2)}{" "} %
                    </h5>
                  </div>
                </div>
              </div>  
            </div> 
    
    
             <div className="w-full mt-3 bg-[#111C43] rounded-sm shadow ">
                <div className="flex items-center bg-[#111C43] p-3 justify-between">
                  <div className="">
                    <PiUsersFourLight className="text-[#45CBA0] text-[30px]" />
                    <h5 className="pt-2 font-Poppins text-[#fff]  text-[20px]">
                      {UsersWidgetsData?.Users}
                    </h5>
                    <h5 className="py-2 font-Poppins text-[#45CBA0] text-[20px] font-[400]">
                      New Users
                    </h5>
                  </div>
                  <div>
                    <CircularProgressWithLabel
                      value={100}
                      open={false}
                    />
                    <h5 className="text-center pt-4">
                      {UsersWidgetsData?.UsersComaparePercentage > 0
                        ? "+" + UsersWidgetsData?.UsersComaparePercentage?.toFixed(2)
                        : "-" +
                        UsersWidgetsData?.UsersComaparePercentage?.toFixed(2)}{" "} %
                    </h5>
                  </div>
                </div>
              </div>
             </div>
                </>) :
             
                
           ""
                
            
            }    
        
        
        
    </>
  )
}

export default AdminDashboardWidgets