import React from 'react'
import { IoMdCheckmark } from 'react-icons/io'

type Props = {

    activeItem:number

}

const CreateCourseOption = ({activeItem}: Props) => {





  return (
    <>
      <div className='flex min-lg:flex-col min-lg:ml-10'>    
          
       <div className='flex flex-col items'>       
       <div className='flex items-center min-md:gap-5'>      
       <div className={` ${activeItem >= 1 ? "bg-blue-500" : "bg-[#384766]"} w-[20px] h-[20px]  min-lg:w-[30px] min-lg:h-[30px] rounded-full relative`}></div>
       <p>Course Information</p>     
       <IoMdCheckmark className="text-[10px] min-lg:text-[20px] absolute ml-1"/>               
       </div>
                  
       <div className={` ${activeItem >= 1 ? "bg-blue-500" : "bg-[#384766]"} max-md:hidden w-[5px] h-[50px] ml-[12px] mt-[1px]`}></div>

       </div> 


       <div className='flex flex-col items'>       
       <div className='flex items-center min-md:gap-5'>      
       <div className={` ${activeItem >= 2 ? "bg-blue-500" : "bg-[#384766]"} w-[20px] h-[20px]  min-lg:w-[30px] min-lg:h-[30px] rounded-full relative`}></div>
       <p>Course Options</p>  <IoMdCheckmark className="text-[10px] min-lg:text-[20px] ml-1 absolute"/>           
       </div>
                  
       <div className={` ${activeItem >= 2 ? "bg-blue-500" : "bg-[#384766]"} max-md:hidden w-[5px] h-[50px] ml-[12px] mt-[1px]`}></div>

       </div> 
              

       <div className='flex flex-col items'>       
       <div className='flex items-center min-md:gap-5'>      
       <div className={` ${activeItem >= 3 ? "bg-blue-500" : "bg-[#384766]"} w-[20px] h-[20px]  min-lg:w-[30px] min-lg:h-[30px] rounded-full relative`}></div>
       <p>Course Content</p>
       <IoMdCheckmark className="text-[10px] min-lg:text-[20px] absolute ml-1" />         
       </div>
                  
       <div className={` ${activeItem >= 3 ? "bg-blue-500" : "bg-[#384766]"} max-md:hidden w-[5px] h-[50px] ml-[12px] mt-[1px]`}></div>

       </div> 
              

       <div className='flex flex-col items'>       
       <div className='flex items-center min-md:gap-5'>      
       <div className={` ${activeItem == 4 ? "bg-blue-500" : "bg-[#384766]"} w-[20px] h-[20px] min-lg:w-[30px] min-lg:h-[30px] rounded-full relative`}></div>
       <p>Course Preview</p>
       <IoMdCheckmark className="text-[10px] min-lg:text-[20px] absolute ml-1" />  
       </div>
                  
       </div> 

</div>

  </>
  )
}

export default CreateCourseOption