"use client"

import { useGetCoursesAnalyticsQuery } from '../../../redux/features/analyticsApi';
import React, { useEffect } from 'react'
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
} from "recharts";
import Loader from '../Loader/Loader';


type Props = {}

const CourseAnalytics = (props: Props) => {

 const { data,isLoading,isSuccess } = useGetCoursesAnalyticsQuery({});

 const analyticsData:any = [];   

    const minValue = 0;
    
    useEffect(() => {
       
data&&data?.CourseAnalytics?.last12Months.forEach((e:any)=>{
analyticsData.push({name:e.month,uv:e.count})

})

    },[data]);



  return (
      <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div className="mt-[10px]">
            <h1 className={`text-[25px] text-white font-bold font-Poppins text-center py-2 px-5 !text-start`}>
              Courses Analytics
            </h1>
            <p className={`text-[16px] font-Poppins text-white px-5`}>
              Last 12 months analytics data{" "}
            </p>
          </div>

          <div className="w-full h-[100%] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="50%">
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minValue, "auto"]} />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  )
}

export default CourseAnalytics