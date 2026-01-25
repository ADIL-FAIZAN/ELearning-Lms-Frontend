"use client"

import { useGetLayoutQuery } from '../../redux/features/layoutApi';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAllCoursesDataQuery } from '../../redux/features/courseApi';
import Header from '../components/Header';
import CourseCard from '../components/CourseCard';
import Loader from '../components/Loader/Loader';
import Footer from '../components/Footer';


type Props = {}

const AllCourses = (props: Props) => {


const [route, setRoute] = useState("Login");
const [open,setOpen] = useState(false);
const [activeItem, setActiveItem] = useState(1);    
const [category,setCategory] = useState("All")    
const query:null | ReadonlyURLSearchParams = useSearchParams();
const { data:AllCoursesData,isLoading:AllCoursesDataLoading } = useAllCoursesDataQuery(undefined,{refetchOnMountOrArgChange:true});
const { data: categoriesData, isLoading: categoriesDataLoading } = useGetLayoutQuery("Categories");
const [Courses, setCourses] = useState([]);    
const queryData = query?.get("title");      


useEffect(() => {
    
        if (queryData) {
    
            setCourses(AllCoursesData?.AllCoursesData?.filter((eachCourse: any) => {
             
                if (eachCourse?.name?.toLowerCase().includes(queryData?.toLowerCase())) {
                
                return true;   

                } else {

                return false;
                
                }
            }));
         
        } else if (category === "All") {
         
            setCourses(AllCoursesData?.AllCoursesData);
         
        } else {
         
            setCourses(AllCoursesData?.AllCoursesData.filter((eachCourse: any) => {
      
                if (eachCourse?.categories === category) {
             
                return true;

                } else {
             
                return false;

                };
             
            }))
         
        };

    }, [category, queryData,AllCoursesData]);

  return (
    <>
     <Header open={open} setOpen={setOpen} activeItem={activeItem} route={route} setRoute={setRoute} />  
      <div className='max-xl:px-4 px-15 mt-6 min-h-screen '>

       {AllCoursesDataLoading ? (
    
       <Loader/>
              
        ):(        
        <>
      <div className="w-full flex max-md:flex-col max-md:justify-center max-md:items-center flex-wrap">
              <div
                className={`h-[35px] ${
                  category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"
                } m-3 px-3 max-md:w-fit rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                onClick={() => setCategory("All")}
              >
                All
              </div>
              
                <div className='flex max-md:flex-col max-md:items-center max-md:justify-center'>
              {categoriesData &&
                categoriesData?.layout?.categories?.map((item: any, index: number) => (
                  <div key={index}>
                    <div
                      className={`h-[35px] ${
                        category === item?.title
                          ? "bg-[crimson]"
                          : "bg-[#5050cb]"
                      } m-3 px-3 rounded-[30px] max-md:w-fit flex items-center justify-center font-Poppins cursor-pointer`}
                      onClick={() => setCategory(item?.title)}
                    >
                      {item?.title}
                    </div>
                  </div>
                ))}
                  </div>  
      </div>        
                              
              <div className='max-sm:flex max-sm:justify-center max-sm:w-full mt-10'>
      <div className='grid max-md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-sm:w-fit w-full gap-5 h-full'>  
                                
      {Courses?.map((eachCourse: any) => (
          
      <CourseCard {...eachCourse} />                
                      
      ))}            
      
      </div>  
      </div>          
      </>
                          
      )}
              
      </div>
      
      <div className='mt-5'>
      <Footer/>
      </div>
      </>
          

  )
}

export default AllCourses