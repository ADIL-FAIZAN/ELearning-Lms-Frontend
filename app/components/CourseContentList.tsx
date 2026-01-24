"use client"

import React, { useEffect, useState } from 'react'
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";


type Props = {
 
    courseData: any[]

};


const CourseContentList = ({courseData}: Props) => {

  
    const [activeItem, setActiveItem] = useState<number | null>(null);
    const [uniqueSections, setUniqueSections] = useState<any []>([]);

   const uniqueSectionsMap = new Map();

    function findUniqueSections() {
    
       
        for (let i = 0; i < courseData?.length; i++){
            
        if (!uniqueSectionsMap.has(courseData[i]?.videoSection)) {
            
            uniqueSectionsMap.set(courseData[i]?.videoSection, 1);

            };

        }; // For Loop Ends Here

        const Arr:any = [];

        uniqueSectionsMap?.forEach((value, key) => (
             
        Arr.push(key)

         )); 
     

        setUniqueSections(Arr);



    };  // findUniqueSections() Ends Here
    
  
useEffect(() => {
  if (courseData?.length > 0) {
    findUniqueSections();
  }
}, [courseData]);



  return (
  
      <div className='w-full'>
        
      {uniqueSections.length !== 0 ? (<>
          
              {uniqueSections?.map((uniqueSection: any,sectionIndex:number) => {
              
            const filteredSectionData = courseData?.filter((eachCourseData: any) => (eachCourseData?.videoSection === uniqueSection)); 
                  
                  const timeDuration = filteredSectionData?.reduce((acum, current) => {
                 
                      return acum += current?.videoLength;
                      
                      
                  }, 0);     
                  
                 // conversion
                const hours = Math.floor(timeDuration / 60);
                const minutes = timeDuration % 60;
                  
                  return (
                  <div className='pr-0'>
                      <div className='w-full h-[60px]  mt-5'>
                               
                          <div className='flex justify-between h-full'> {/* grid grid-cols-12 */}
                              <div > {/* className='col-span-6' */}
                                  <div className='flex flex-col h-full'>
                                      <p>{uniqueSection}</p>
                                      <p>{` ${filteredSectionData?.length} lessons ~${hours>0?` ${hours}.${minutes} minutes `:`${minutes} minutes `}`}</p>
                                  </div>
                           </div>
                                 
                                  
                  <div> {/* <div className='col-span-6 px-3'></div> */}
                  <div>
                  <div className='cursor-pointer' onClick={() => { setActiveItem(activeItem === sectionIndex ? null : sectionIndex)}} >
                                              
                  {activeItem === sectionIndex ? (
                  <BsChevronDown size={20} />
                  ) : (
                    <BsChevronUp size={20}  />
                  )}</div>
                                  
                     </div>
                     </div>
                          
                                 
                     </div>  {/* flex  Parent Div */}
                      </div>

                          
        {activeItem === sectionIndex && (
                       
                        
          <div >
          {filteredSectionData?.map((course: any, index: number) => (
            <div key={index} className="flex gap-2 py-3 items-center">
              <MdOutlineOndemandVideo size={25} className="mr-2" color="#1cdada" />
               <div className='flex flex-col'>   
                      <p className='text-[15px]'>{course?.title}</p>
                      <p className='text-[15px]'>{course?.videoLength} minutes</p>
                 </div>     
            </div>
          ))}
        </div>
      
                                  
                      )}
                      
                  <div className="w-full h-[1px] bg-white"></div>    
                  

                      </div>
                  )
              }
              
              )}
              
              
       </>):""}
      
       </div>
   
  )
}

export default CourseContentList