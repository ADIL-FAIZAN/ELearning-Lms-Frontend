import Image from 'next/image'
import React from 'react'

type Props = {}

const HomeText = (props: Props) => {



  return (
        
      <div className='w-full min-md:flex min-md:justify-between mt-6 min-md:mt-20 h-full'>
          
          <div className='min-md:w-[45%] w-[100%] h-[350px] relative rounded'>
          
          <Image
          fill
          alt='image'
          src="/assests/bussiness.jpg"

          className="w-full h-full rounded"
          />
              
          </div> 
          
       <div className='min-md:w-[50%] w-full h-[350px] mt-20'>
          
       <div className='flex justify-center font-bold font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl text-white !leading-[60px]tracking-tight'>
       <div className='lg:w-full'>

       <div className='flex flex-col items-center justify-center '>     
       <p className='max-md:inline-block'>Our Students Are</p>
       <div className="text-gradient min-md:inline-block ">Our Strength</div>
       </div>
              
          <div className='mt-5 w-full flex justify-center'>
          <div className='max-md:w-[180px] max-lg:text-2xl text-3xl max-lg:px-5'>See What They Say About Us</div>
          </div>
            
          </div>
          </div> 
          
          <p className='mt-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ex iste amet magni, id animi adipisci repellat facilis! Nobis repellendus a facilis voluptate veritatis cum officia debitis et aliquid doloribus.</p>

      </div> 
      </div>
  
  
  
  )
}

export default HomeText