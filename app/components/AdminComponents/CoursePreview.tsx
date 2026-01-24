"use client"

import axios from "axios";
import CourseVideo from "./CreateCourse/CourseVideo";
import Ratings from "../../utils/Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5";


type Props = {

    activeItem: number,
    setActiveItem: any,
    createCourseHandler: any,
    courseData: any,
    isEdit?:boolean

};

const CoursePreview = ({activeItem,setActiveItem,createCourseHandler,courseData,isEdit}: Props) => {


 const discountPercentage = (((courseData?.estimatedPrice - courseData?.price) / courseData?.estimatedPrice) * 100).toFixed(0);

    
    const prevButton = () => {
     
    setActiveItem((prev:any) => prev - 1);

    };
    
    const createCourse = () => {
     
    createCourseHandler();

    }; 
        
        
  return (
    
      <div className="flex flex-col w-full min-h-screen px-7  pb-10">
          
      <div className="w-full max-lg:h-[200px] min-lg:h-[500px] bg-yellow-500">
      <CourseVideo videoUrl={courseData?.demoUrl} />
      </div>
      <div className=" h-[40px] w-full flex gap-3 mt-2 items-center">

      <p className="text-white text-[22px] font-bold">{courseData?.price === 0 ? 'Free': `$${courseData?.price}`}</p>
      <p className="text-red-800 text-[20px]">${courseData?.estimatedPrice}</p>
      <p>{discountPercentage}% Off</p>  

      </div>
          <div className="w-[200px] h-[40px] font-bold mt-5 text-[16px] flex justify-center items-center rounded-2xl bg-[crimson]">Buy Now  {courseData?.price }$</div> 
    
      <div className="flex gap-5">

      <input
            type="name"
            name=""
            
            id="name"
            placeholder="Discount Code..."
            className="w-[400px] text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[20px] font-Poppins"
              />
            <div className="w-[100px] h-[40px] font-bold mt-5 text-[16px] flex justify-center items-center rounded-4xl bg-blue-500">Apply</div>    

        </div>
   
          <div className="mt-5">
              
 <p className="pb-1">
          • Source code included
        </p>
        <p className="pb-1">
          • Full lifetime access
        </p>
        <p className="pb-1 ">
          • Certificate of completion
        </p>
        <p className="pb-3 800px:pb-1  ">
          • Premium Support
        </p>

          </div>


          <div className="font-semibold mt-2">{courseData?.name}</div>
          <div className="flex"><Ratings rating={0}/> 0 Reviews </div>
           <br />
          <h1 className="text-[25px] font-Poppins font-bold text-white">
            What you will learn from this course?
          </h1>
       
          {courseData?.benefits?.map((item: any, index: number) => (
          <div className="w-full flex 800px:items-center py-2" key={index}>
            <div className="w-[15px] mr-1 text-[#3ccba0]">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2 text-white ">{item?.title}</p>
          </div>
          ))}
          
      
        <h1 className="text-[25px] mt-5 font-Poppins font-semibold text-white ">
          What are the prerequisites for starting this course?
        </h1>
        {courseData?.prerequistes?.map((item: any, index: number) => (
          <div className="w-full flex 800px:items-center py-2" key={index}>
            <div className="w-[15px] mr-1 text-[#3ccba0]">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2 text-white">{item?.title}</p>
          </div>
        ))}

         <br />
        <br />
        <div className="w-full">
          <h1 className="text-[25px] font-Poppins font-semibold text-white ">
            Course Details
          </h1>
          <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-gray-200 ">
            {courseData?.description}
          </p>
        </div>
        <br />
        <br />
      
              <div className="w-full flex items-center justify-between">
        <div
          className="w-[120px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 m-[20px] cursor-pointer"
          onClick={prevButton}
        >
          Prev
        </div>
        <div
          className="w-[120px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 m-[20px] cursor-pointer"
          onClick={createCourse}
        >
          {isEdit ? "Update" : "Create" }
        </div>
      </div>




      </div>
  
      

  
  )
}

export default CoursePreview;