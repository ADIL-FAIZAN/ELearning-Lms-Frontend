
"use client"

import { useGetUsersAnalyticsQuery } from '../../../redux/features/analyticsApi';
import React, { useEffect } from 'react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Loader from '../../components/Loader/Loader';


type Props = {

  isDashboard?:boolean

}

const UserAnalytics = ({isDashboard}: Props) => {
 
     const { data,isLoading,isSuccess } = useGetUsersAnalyticsQuery({});
    
     const analyticsData:any = [];   
    
     data && data?.userAnalytics?.last12Months.forEach((e: any) => {
    
     analyticsData.push({ name: e.month, count: e.count })
    
     });
    
  
    return (
  
      <>
      {isLoading ? (
        <Loader />
        ) : (
            
        <div className={`${isDashboard? "mt-0":"mt-[50px] "} bg-[#111C43] `}>
          <div className={`${isDashboard? " absolute left-100":" w-full"  }  `}>
            <h1
              className={`${isDashboard? "text-[18px]":"text-[25px]"} text-white font-bold font-Poppins py-2 px-5 `}
            >
              Users Analytics
            </h1>
           
              <p className={`text-[16px] font-Poppins text-white px-5`}>
                Last 12 months analytics data
              </p>
            
          </div>

          <div
            className={`w-full flex items-center `}
          >
            <ResponsiveContainer
              width={"99%"}
              height={300}
            >
              <AreaChart
                data={analyticsData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#4d62d9"
                  fill="#4d62d9"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
 
    )
}

export default UserAnalytics;