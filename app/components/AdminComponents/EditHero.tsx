"use client"

import { useEditLayoutMutation, useGetLayoutQuery } from '@/redux/features/layoutApi'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineCamera } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import Loader from '../Loader/Loader'

type Props = {}

const EditHero = (props: Props) => {

const {data} = useGetLayoutQuery("Banner");         
const [image, setImage] = useState("");
const [title, setTitle] = useState("");
const [subTitle, setSubTitle] = useState("");
const [editLayout,{isError,isLoading,isSuccess,error}] = useEditLayoutMutation()

  
  const imageHandler = (e:any) => {
    
  const fileReader = new FileReader();
    
    fileReader.onload = async () => {
    
      if (fileReader.readyState == 2) {
      
      const result = fileReader.result;
        setImage(result as string);
      
    };
      };
  
    fileReader.readAsDataURL(e.target.files[0]);

  };


    
    

    useEffect(() => {
    
if (data) {
    
setImage(data?.layout?.banner?.image?.url);
setTitle(data?.layout?.banner?.title);
setSubTitle(data?.layout?.banner?.subTitle);

}     

    }, [data]);

 

    const EditLayoutSaveHandler = async () => {
        
        if (title !== data?.layout?.banner?.title || subTitle !== data?.layout?.banner?.subTitle || image !== data?.layout?.banner?.image?.url) {
 
        await editLayout({ image, title, subTitle, type:"Banner"});

        } 
 

    };
    

    useEffect(() => {
        

    if (isSuccess) {
    
    toast.success("Layout Update Successfully");    



    } else {
        
      if (error) {
      
        const errorMessage = error as any;
        toast.error(errorMessage?.data?.message);

      }
      

    }

    }, [isSuccess,error]);







  return (
 
<>
    {isLoading ? (
      <Loader />
    ) : (
      <div className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 lg:px-8 py-10 lg:py-0 relative overflow-hidden">

        {/* Animated background circle */}
        <div className="absolute max-lg:top-[50px] lg:left-[60px] xl:left-[100px] 
          max-md:w-[300px] max-md:h-[300px] 
          md:w-[350px] md:h-[350px] 
          lg:w-[400px] lg:h-[400px] 
          xl:w-[500px] xl:h-[500px] 
          hero_animation rounded-full opacity-20 lg:opacity-30">
        </div>

        {/* ===== LEFT: Hero Image ===== */}
        <div className="relative max-md:w-[200px] max-md:h-[200px] md:w-[270px] md:h-[270px] 
          lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px] 
          lg:w-1/2 flex items-center justify-center z-10 
          max-md:mt-[50px] lg:ml-[40px] xl:ml-[100px]">

          <Image
            src={image}
            width={270}
            height={270}
            alt="Hero Banner"
            className="object-contain w-full max-w-full lg:max-w-[270px] h-auto"
          />

          {/* Camera Icon */}
          <div className="absolute bottom-2 right-2 w-[35px] h-[35px] bg-black rounded-full 
            flex items-center justify-center cursor-pointer">
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={imageHandler}
            />
            <label htmlFor="image" className="cursor-pointer text-white">
              <AiOutlineCamera size={18} />
            </label>
          </div>
        </div>

        {/* ===== RIGHT: Editable Content ===== */}
        <div className="lg:w-1/2 flex flex-col max-lg:mt-[100px]  items-center lg:items-start text-center lg:text-left z-10 max-lg:mt-14">

          {/* Title */}
          <textarea
            className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight 
              resize-none outline-none bg-transparent w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={3}
            placeholder="Hero Title"
          />

          {/* Subtitle */}
          <textarea
            className="text-lg text-gray-300 mb-8 max-w-lg resize-none 
              outline-none bg-transparent w-full"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            rows={4}
            placeholder="Hero Subtitle"
          />

          {/* Save Button */}
          <div className="w-full flex justify-start">
            <div
              className={`w-[120px] h-[40px] flex items-center justify-center text-white rounded
                ${
                  title !== data?.layout?.banner?.title ||
                  subTitle !== data?.layout?.banner?.subTitle ||
                  image !== data?.layout?.banner?.image?.url
                    ? "bg-[#37a39a] cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              onClick={EditLayoutSaveHandler}
            >
              Save
            </div>
          </div>

        </div>
      </div>
    )}
  </>




//    <>
  
//   { isLoading ? (
  

//     <Loader/>

//    ): (

//    <div className="w-full min-h-screen">
      
//       <div className="w-full  h-full flex flex-col gap-15 lg:flex-row items-center justify-center lg:justify-between px-4 lg:py-0 relative overflow-hidden">
//                {/* Animated background circle */}
//                   <div className="absolute  max-md  max-lg:top-[50px] lg:left-[60px] xl:left-[100px] max-md:w-[300px] max-md:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px] hero_animation rounded-full opacity-20 lg:opacity-30"></div>
//                         {/* Hero banner Image */}
//                         <div className="max-md:w-[280px] max-md:h-[280px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px] lg:w-1/2 flex items-center justify-center z-10 md:mr-0 md:mt-5 max-md:mt-[50px] lg:ml-[40px]  xl:ml-[100px]   mb-18 ">
                          
//                         <Image
//                               src={image}
//                               width={300}
//                               height={300}
//                               alt="Hero Banner"
//                               className="object-contain w-full max-w-full lg:max-w-[300px] h-auto"
//                         />
                          
//                         </div>
//               <div className="w-[30px] h-[30px] bg-black rounded flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[50px]">
//                             <input
//                             type="file"
//                             id="image"
//                             className="hidden"
//                             onChange={(e)=>imageHandler(e)}
//                             />
//                             <label htmlFor="image" className='cursor-pointer'>
//                                 <AiOutlineCamera/>
//                               </label>
//                             </div>
// </div>

           
//                {/* Hero content section */}
//                <div className=" flex flex-col items-center h-[500px] lg:items-start text-center lg:text-left z-10 max-lg:mt-5">
//                  {/* Main headline */}
                 
//                 <textarea
//               className="text-white resize-none text-3xl lg:text-5xl font-bold mt-15 w-full h-full  font-Josefin py-2  outline-none bg-transparent block"
//               placeholder="Improve Your Online Learning Experience Better Instantly"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               rows={3}
//             />
//             <br />
//             <textarea
//               className="text-lg text-gray-300 max-lg:mb-40  max-lg:h-[400px] w-[90%] outline-none bg-transparent block"
//               placeholder="Learn from the best instructors and take your skills to the next level."
//               value={subTitle}
//               onChange={(e) => setSubTitle(e.target.value)}
//               rows={4}
//             />

//             <br />
//             <br />
                   
                 
//           </div>
          
  
  
//       <div className="w-full flex justify-end">
//       <div
//  className={`w-[120px] flex items-center justify-center h-[40px] ${title !== data?.layout?.banner?.title || subTitle !== data?.layout?.banner?.subTitle || image !== data?.layout?.banner?.image?.url?`bg-[#37a39a] cursor-pointer`: `bg-gray-300 !cursor-not-allowed `}  text-center text-[#fff] rounded m-[20px]`}
//  onClick={EditLayoutSaveHandler}
//         >
//           Save
//         </div>
//         </div>
      
//       </div>
  
//   )}
//  </>
  )
}

export default EditHero