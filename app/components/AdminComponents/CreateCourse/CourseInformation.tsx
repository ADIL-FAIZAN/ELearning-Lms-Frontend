"use client"

import { useGetLayoutQuery } from '../../../../redux/features/layoutApi'
import React, { useEffect, useState } from 'react'

type Props = {

setCourseInfo: (value: any) => void,
courseInfo: any,
setActiveItem: (value: any) => void

}

const CourseInformation = ({setCourseInfo,courseInfo,setActiveItem}: Props) => {

  // State to track drag status for file drop area
 const {data:CategoryData} = useGetLayoutQuery("Categories");         
 const [categories, setCategories] = useState([]);
 const [dragging, setDragging] = useState(false);

  
  useEffect(() => {
    
    setCategories(CategoryData?.layout?.categories);


  }, [CategoryData]);
  
  
  
    const handleSubmit = (e: any) => {
    
      e.preventDefault();
      console.log("courseInfo", courseInfo);
      setActiveItem(2);

    };

  // Handles image file selection and sets thumbnail preview
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: e.target.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Triggered when file is dragged over drop area
  const handleDrageOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  // Triggered when drag leaves the drop area
  const handleDrageLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  // Handles drop event for thumbnail upload
  const handleDrop = (e: any) => {

    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (e: any) => {
        setCourseInfo({ ...courseInfo, thumbnail: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

    


  return (
          
      <div className='min-h-screen pb-20'>
          
      <form onSubmit={handleSubmit}>
        {/* Course name input */}
        <div>
          <label htmlFor="" className="text-[16px] font-Poppins text-white">
            Course Name
          </label>
          <input
            type="name"
            name=""
            // required
            value={courseInfo.name}
            onChange={(e: any) => setCourseInfo({ ...courseInfo, name: e.target.value })}
            id="name"
            placeholder="MERN stack LMS platform with next 13"
            className="w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
          />
        </div>
        <br />
              
{/* Course description input */}
        <div className="mb-5">
          <label className="text-[16px] font-Poppins text-white">Course Description</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={8}
            placeholder="Write something amazing..."
            className="w-full text-white bg-transparent border rounded h-[150px] pt-1 px-2 outline-none mt-[10px] font-Poppins"
            value={courseInfo?.description}
            onChange={(e: any) => setCourseInfo({ ...courseInfo, description: e.target.value })}
          ></textarea>
        </div>
        <br />

            <div className='w-full flex gap-10'>
            <div className='w-[48%]'>    
          <label htmlFor="" className="text-[16px] font-Poppins text-white">
            Course Price
          </label>
          <input
            type="name"
            name=""
            // required
            value={courseInfo?.price}
            onChange={(e: any) => setCourseInfo({ ...courseInfo, price: e.target.value })}
            id="name"
            placeholder="MERN stack LMS platform with next 13"
            className="w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
          />
          </div>
        



         <div className='w-[48%]'>
          <label htmlFor="" className="text-[16px] font-Poppins text-white">
           Estimated Course Price (Optional)
          </label>
          <input
            type="name"
            name=""
            // required
            value={courseInfo.estimatedPrice}
               onChange={(e: any) => setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })}
            id="name"
            placeholder="MERN stack LMS platform with next 13"
            className="w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
          />
        </div>

   </div> 

        <br />

              
    <div>
          <label htmlFor="" className="text-[16px] font-Poppins text-white">
            Course Tags
          </label>
          <input
            type="name"
            name=""
            // required
            value={courseInfo.tags}
            onChange={(e: any) => setCourseInfo({ ...courseInfo, tags: e.target.value })}
            id="name"
            placeholder="MERN stack LMS platform with next 13"
            className="w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
          />
        </div>
        <br />

            <div className='w-full flex gap-10'>
            <div className='w-[48%]'>    
          <label htmlFor="" className="text-[16px] font-Poppins text-white">
            Course Level
          </label>
          <input
            type="name"
            name=""
            // required
            value={courseInfo.level}
            onChange={(e: any) => setCourseInfo({ ...courseInfo, level: e.target.value })}
            id="name"
            placeholder="Beginner/Intermediate/Expert"
            className="w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
          />
          </div>

         <div className='w-[48%]'>
          <label htmlFor="" className="text-[16px] font-Poppins text-white">
           Demo Url
          </label>
          <input
            type="name"
            name=""
            // required
            value={courseInfo.demoUrl}
            onChange={(e: any) => setCourseInfo({ ...courseInfo, demoUrl: e.target.value })}
            id="name"
            placeholder="MERN stack LMS platform with next 13"
            className="w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
          />
        </div>

        </div> 
        <br />

         {/* Course category input */}
        <div className="mb-5 flex flex-col">
        <label className="text-[16px] font-Poppins text-white">Category</label>
        <select
        className="w-[48%]  border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins bg-[#111828]"
        value={courseInfo?.categories}
        onChange={(e: any) => setCourseInfo({ ...courseInfo, categories: e.target.value })}  
     
        >
      <option value="" disabled>
      Select Category
    </option>
        {categories?.map((e:any) => (
       
         <option value={e?.title}>{e?.title}</option>
      
          ))}       
    
    
    </select>   
        
        </div>
        <br />





{/* Thumbnail upload via file input or drag-and-drop */}
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            className={`w-full min-h-[10vh]border-white p-3 border flex items-center cursor-pointer justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            htmlFor="file"
            onDragOver={handleDrageOver}
            onDrop={handleDrop}
            onDragLeave={handleDrageLeave}
          >
            {courseInfo?.thumbnail ? (
              <img
                src={courseInfo?.thumbnail}
                alt=""
                className="max-h-[400px] object-contain w-full"
              />
            ) : (
              <span>Drag and Drop Your Thumbnail here or click to Browse</span>
            )}
          </label>
        </div>
        <br />
        {/* Submit button to go to next step */}
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-[150px] 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>

        </form> 
            

      </div>
  
  
  )
}

export default CourseInformation