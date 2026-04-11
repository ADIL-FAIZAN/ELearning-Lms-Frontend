"use client"

import { useGetSingleCourseQuery } from '@/redux/features/courseApi';
import React, { use, useEffect, useState } from 'react'
import Loader from './Loader/Loader';
import Header from './Header';
import { useSelector } from 'react-redux';
import Footer from './Footer';
import Ratings from '../utils/Ratings';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import CourseVideo from './AdminComponents/CreateCourse/CourseVideo';
import CourseContentList from './CourseContentList';
import { RxCross1 } from 'react-icons/rx';
import { useCreatePaymentIntentMutation, useGetStripePublishableKeyQuery } from '@/redux/features/orderApi';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';
import { format } from 'timeago.js';
import { VscVerifiedFilled } from 'react-icons/vsc';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import toast from 'react-hot-toast';
import CustomModal from '../utils/CustomModal';
import Login from './Auth/login';


type Props = {
 courseId: string
};

const CourseDetail = ({ courseId }: Props) => {

    const { data: courseData, isLoading,refetch:refetchSingleCourse } = useGetSingleCourseQuery(courseId);
    const [route, setRoute] = useState("Login");
    const [open,setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(1); 
    const { user } = useSelector((state: any) => state?.auth);
    const [popUpOpen, setPopUpOpen] = useState(false); 
    const discountedPercentage =((courseData?.course?.estimatedPrice-courseData?.course?.price)/courseData?.course?.estimatedPrice*100);
    const isPurchased = user && user?.courses?.find((e: any) => e?.courseId === courseData?.course._id);
    const {data:stripePublishableKeyData,error } = useGetStripePublishableKeyQuery({});
    const [stripePromise, setStripePromise] = useState<any>(null);
    const [CreatePaymentIntent, {isLoading:paymentIntentLoading,data:paymentIntentData}] = useCreatePaymentIntentMutation();
    const [clientSecret, setClientSecret] = useState(null);
    const router = useRouter();
    const {refetch:userRefetch,data:userData} = useLoadUserQuery(undefined,{});
     
 
  useEffect(() => {
  
    if (stripePublishableKeyData) {
    
    const publishableKey = stripePublishableKeyData.stripePublishableKey;
    setStripePromise(loadStripe(publishableKey));
      
    };

    if (courseData) {
      
      const amount = Math.round(courseData?.course?.price * 100);
      CreatePaymentIntent(amount);

    };

  }, [courseData, stripePublishableKeyData]);

  useEffect(() => {
    
  if (paymentIntentData) {  
  setClientSecret(paymentIntentData?.client_secret);
  };

  }, [paymentIntentData]);

  

    const handleOrder = () => {
      
      if (!user) {
      
      setOpen(true);

      } else {
        
      setPopUpOpen(!popUpOpen);

      }; 
    
    };



    const handleRefetch = async () => {
      
    try {
  
    const result = await userRefetch();
    router.push(`/course-access/${courseId}`);
      
    } catch (err) {
    
    console.error("Refetch failed:", err);
  
    }
      
    };
  

    return (  
    
    <>
    {isLoading?(      
    <>
    <Loader/>
    </>
    ) : (
           
    <>             
    <Header open={open} setOpen={setOpen} activeItem={activeItem} route={route} setRoute={setRoute} />                 
              
    {stripePromise ? (
    <>

    <div className='grid grid-cols-12 mt-10 px-10 min-h-screen'>

    <div className='col-span-8 pr-15'>
                                
    <div> {/* Course Detail Parent Div */}
    
    <div>  
    <div className='font-poppins font-bold text-[22px]'>

    {courseData?.course?.name}                           

    </div>
                            
    <div className='flex justify-between w-full mt-2 mb-5'>

    <div className='flex'>
    <Ratings rating={courseData?.course.ratings} />                               
    <div>{courseData?.course?.reviews?.length} Reviews</div>                              
    </div>

    <div>{courseData?.course?.purchased} Student</div>    

    </div>
                            
    <div>
    <p className="font-poppins font-bold text-[25px]">What you will learn from this course?</p>
    
     <div className='mt-2'>                               
    {courseData?.course?.benefits?.map((benefit: any) => (
        
    <div className='flex gap-2 items-center'>
                                        
    <div className="w-[15px] mr-1">
    <IoCheckmarkDoneOutline
     size={17}
     className="text-white"
     />
    </div>                    
        
    <p className='text-[17px]'>{benefit?.title}</p>
                                    
    </div>

    ))}                                
    
    </div>
    </div>                            
    </div> 
    <br/>
    <br/>
                                    
    <div>
    <p className="font-poppins font-bold text-[25px]">What are the prerequistes for starting this course?</p>
    
     <div className='mt-2'>                               
    {courseData?.course?.prerequistes?.map((prerequistes: any) => (
        
    <div className='flex gap-2 items-center'>
                                        
    <div className="w-[15px] mr-1">
    <IoCheckmarkDoneOutline
     size={17}
     className="text-white"
     />
     </div>                                   
    <p className='text-[17px]'>{prerequistes?.title}</p>
                                    
    </div>

    ))}                                
    
    </div>
    </div> 

                                
    <div className='my-10'>

    <div>                                    
    <p className='text-[25px] font-bold font-poppins mt-10'>Course Overview</p>   

    <CourseContentList courseData={courseData?.course?.courseData} />

    </div>                                        
    <p className='text-[25px] font-bold font-poppins mt-8'>Course Details</p>

    <p className='mt-3'>{courseData?.course?.description }</p>

    </div>
                                
    <div className='flex mt-10'>
    <Ratings rating={courseData?.course?.ratings } />
    <p>{courseData?.course?.ratings.toString().length==1 ? courseData?.course?.ratings.toString()+".0" : courseData?.course?.ratings } Course Rating • {courseData?.course?.reviews?.length} Reviews</p>           
   </div>
   
    <div className='flex flex-col pt-7 pb-10'>
                        
         {[...courseData?.course?.reviews]?.slice().reverse()?.map((eachReview: any) => (
                        <div className='flex mt-8  w-full'>
                              
                          <div className='h-full w-[50px]'>
                          <div className="w-[35px] h-[35px] rounded-full">
                          <Image src={eachReview?.user?.avatar?.url && eachReview?.user?.avatar?.url || "/assests/avatardefault.jpg"} height={35} width={35} className="w-full h-full object-cover rounded-full border:2px solid #37a39a" alt="User Avatar" />
                          </div>
                          </div>
    
                          <div className='w-full flex flex-col'>
                                  
                            <div className='font-bold text-[15px]'>{eachReview?.user?.name && eachReview?.user?.name}</div>
                            <div className='text-[15px] mt-1'>{eachReview?.comment && eachReview?.comment}</div>
                            <div className='text-[12px]'><Ratings rating={eachReview?.rating} /></div>
                            <div className='mt-1 text-[10px] text-white/50'>{format(eachReview?.createdAt)}</div>
                            
                         {eachReview?.commentReplies?.length!==0 && eachReview?.commentReplies?.map((eachAdminReply:any) => (
                              
                         <div className='flex mt-5 w-full'>                      
                         <div className='h-full w-[50px]'>                       
                         <div className ="w-[30px] h-[30px] rounded-full">   
                         <Image src={eachAdminReply?.user?.avatar?.url && eachAdminReply?.user?.avatar?.url || "/assests/avatardefault.jpg" } height={30} width={30}  className="w-full h-full object-cover rounded-full border:2px solid #37a39a"  alt="User Avatar" />
                         </div> 
                         </div> 
                       
                         <div className='w-full flex flex-col'>
                         <div className='flex gap-2'>
                         <div className='font-bold text-[14px]'>{eachAdminReply?.user?.name && eachAdminReply?.user?.name}</div>
                        {eachAdminReply?.user?.role === "admin" ? <div className='text-blue-700 text-[18px]'><VscVerifiedFilled /></div> : ""}
                         </div>
                             
                        <div className='text-[12px]'>{eachAdminReply?.comment}</div>
                        <div className='mt-1 text-[10px] text-white/50'>{format(eachAdminReply?.createdAt)}</div>
                        </div>
                        </div>    
                                                                    
                        ))}                    
                                   
                        </div>                     
                        </div>   
))} 

   </div>                    
                        

    </div>
    </div>

    <div className='col-span-3'>
                             
        <div>
        <div className='h-[250px] w-full'>
    <CourseVideo videoUrl={courseData?.course?.demoUrl} />                                    

    </div>
    
       <div className='flex my-5 gap-15'>
                 
             <div className='text-[16px] relative'>     
             {courseData?.course?.price}$
                     
             <div className='absolute text-[14px] line-through ml-10 top-[-3px] text-gray-400'>{courseData?.course?.estimatedPrice}$</div>
             </div>
             
             <div>{discountedPercentage.toFixed(0)}% Off</div>  
         
             </div>

            {!isPurchased ?
            <div className='bg-red-700 w-[180px] cursor-pointer font-bold h-[50px] flex items-center justify-center rounded-lg' onClick={handleOrder}>Buy Now {courseData?.course?.price}$ </div>

            : 
            <div className='bg-red-700 w-[180px] cursor-pointer font-bold h-[50px] flex items-center justify-center rounded-lg' onClick={handleRefetch}>Enter to Course</div>
              
            }

                                    <div className='mt-5'>
                                    <div className='flex gap-1'><p className='font-bold'>.</p><p> Source code included</p></div>
                                    <div className='flex gap-1'><p className='font-bold'>.</p><p>Full life time access</p></div>
                                    <div className='flex gap-1'><p className='font-bold'>.</p><p> Certificate of completion</p></div>
                                    <div className='flex gap-1'><p className='font-bold'>.</p><p>Premium Support</p></div>
                                    </div>                        

    </div>   
    </div>

     {popUpOpen ? (
     <>
                
      <div className='w-full bg-[#00000036] fixed top-0 left-0 right-0 bottom-0  flex justify-center items-center'>              
      <div className='w-[400px] h-[400px] bg-white text-black px-3 pt-3 z-50 rounded-sm'>    
      <div className='flex justify-end w-full'><RxCross1 size={20} onClick={()=> setPopUpOpen(!popUpOpen)} /></div>
                            
      {stripePromise && clientSecret&&(
                          
      <>                              
      <Elements stripe={stripePromise} options={{clientSecret}}>                    
      <CheckoutForm courseData={courseData } refetchSingleCourse={refetchSingleCourse} />
      </Elements>                        
      </>                                                
      )}  

      </div>                                 
      </div>                   
      </>
      ) : ""}
    </div>            
    </>   
    
    ) : ""}


 {route === "Login" && open && (
        
          <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
          
        />
    )}
            
    <Footer />                                 
    </>               
        )}{/* is loading main divs */}
        
  </>
  )
}

export default CourseDetail