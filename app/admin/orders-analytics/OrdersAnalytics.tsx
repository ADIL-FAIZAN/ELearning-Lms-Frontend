"use client"

import { useGetOrdersAnalyticsQuery } from '../../../redux/features/analyticsApi';
import React, { useEffect } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Loader from '../../components/Loader/Loader';

type Props = {

  isDashboard?:boolean

}




const OrdersAnalytics = ({isDashboard}: Props) => {


    const { data,isLoading,isSuccess } = useGetOrdersAnalyticsQuery({});
        
  
         const analyticsData:any = [];   
        
            const minValue = 0;
            
        
           
    

            useEffect(() => {
               
              data && data?.OrderAnalytics?.last12Months.forEach((e: any) => {
        
                analyticsData.push({ name: e.month, count: e.count })
        
        
              });
        
        
        
            },[data]);


  return (
    
  <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`${!isDashboard?"h-screen":"h-[340px] w-full "} bg-[#111C43]`}>
          <div
            className={`${!isDashboard?"mt-[50px]":"relative "}`}
            >
              <div className={`${isDashboard? " absolute left-0 ":" w-full"  }  `}>

            <h1
              className={`${!isDashboard? "text-[25px]":"text-[18px]" }text-white font-bold font-Poppins  py-2 px-5 !text-start`}
            >
              Orders Analytics
            </h1>
            
              <p className={`text-[16px] font-Poppins text-white px-5`}>
                Last 12 months analytics data
              </p>
            </div>
          </div>
          <div
            className={`w-full h-full flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={"99%"}
              height={"80%"}
            >
              <LineChart
                width={500}
                height={340}
                data={analyticsData}
                margin={{
                  top:65,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  
  )
}

export default OrdersAnalytics