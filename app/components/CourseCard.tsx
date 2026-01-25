import Image from 'next/image'
import React from 'react'
import Ratings from '../utils/Ratings'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import Link from 'next/link'

type Props = {
  
  EnrolledCourses?:boolean,
  _id:string,
  name: string,
  description: string,
  price: number,
  estimatedPrice: number,
  thumbnail: {

  public_id: string,
  url:string

  },
  tags: string,
  level: string,
  demoUrl: string,
  benefits: [object],
  prerequistes: [object],
  courseData: [object],
  ratings: number,
  purchased: number,
  reviews: [object],
  createdAt:Date
}

const CourseCard = ({EnrolledCourses, _id, name, description, price, estimatedPrice, thumbnail, tags, level, demoUrl, benefits, prerequistes, courseData, ratings, purchased, reviews, createdAt }: Props) => {



  return (
  
    <div className={` ${EnrolledCourses?`w-[270px] h-[300px]`:"w -[340px] h-[300px]"} bg-gray-800 shadow-[bg-slate-700] bg-opacity-20 backdrop-blur border border-[#ffffff1d] px-3 py-3 rounded`}>
          
          {/* Image Div */}
          <Link href={`/course/${_id}`}><div className=' w-full h-[140px] rounded-sm'>
          
        <Image src={ thumbnail?.url  ||"/assests/client-1.jpg"} height={140} width={300}  className="w-[300px] h-[140px] object-cover rounded-sm "  alt="User Avatar" />
              
          </div>   
        </Link>  
          {/* Course Name */}
          
          <div className='mt-3 w-full wrap-break-word text-[#fff] font-poppins'>              
          {name}
          </div>
          
          {/* Ratings and number of students  */}

          <div className='flex justify-between mt-1 '>              
          <div className='text-[16px]'>     
          <Ratings rating={ratings}/>
          </div>

              
          <div className='font-poppins'>
                  
          {purchased} Students

          </div>
          </div>

         <div className='flex justify-between'>
        
          <div className='flex mt-3 h-[50px]'>  
          <div className='text-[16px]'>${price}</div>   
          <div className='pb-30 h-full'>
          <div className='text-[14px] ml-2 line-through text-red-700'>{estimatedPrice}$</div>
          </div>
        </div>
              
       <div className="flex items-center pb-3">
            <AiOutlineUnorderedList size={18} fill="#fff" />
            <h5 className="pl-2 text-[#fff]">
              {courseData?.length} Lectures
            </h5>
          </div>
          
       </div>


      </div>
  
  
  
  
  )
}

export default CourseCard