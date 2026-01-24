"use client"

import { useAddQuestionMutation,useAddAnswerMutation,useAddReviewMutation, useAddReviewReplyMutation, useGetSingleCourseQuery } from '@/redux/features/courseApi'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BiMessage } from 'react-icons/bi'
import { format } from 'timeago.js'
import { VscVerifiedFilled } from "react-icons/vsc";
import Ratings from '../utils/Ratings'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import socketIO from "socket.io-client";
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
const EndPoint = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "";
const socketId = socketIO(EndPoint,{transports: ["websocket"]});


type Props = {

    VideoData: any,
    videoIndex:number,
    user: any,
    course:any
    courseId: any,
    refetch:any

}

const CourseContentSubOptions = ({VideoData,videoIndex,user,courseId,refetch,course}: Props) => {

 const [activeIndex, setActiveIndex] = useState(0);
 const [question, setQuestion] = useState("");
 const [ActiveQuestionIndex, setActiveQuestionIndex] = useState(-1);
 const [answer, setAnswer] = useState("");  
 const [addAnswer,{isLoading:AddAnswerLoading,error:AddAnswerError,isSuccess:AddAnswerSuccess,data:addAnswerResponse}] = useAddAnswerMutation(); 
 const [addQuestion,{isLoading:AddQuestionLoading,error:AddQuestionError,isSuccess:AddQuestionSuccess,data:addQuestionResponse}] = useAddQuestionMutation();
 const [review, setReview] = useState("");       
 const [rating, setRating] = useState(1);  
 const [reviewReply, setReviewReply] = useState("");
 const [activeReviewId, setActiveReviewId] = useState(-1); 
 const [addReview,{isLoading:AddReviewLoading,error:AddReviewError,isSuccess:AddReviewSuccess}] = useAddReviewMutation();
 const [addReviewReply,{isLoading:addReviewReplyLoading,isSuccess:ReviewReplySuccess,error:ReviewReplyError}] = useAddReviewReplyMutation()
 const {refetch:refetchSingleCourseDetails } = useGetSingleCourseQuery(courseId);
 const {refetch:userRefetch,data:userData} = useLoadUserQuery(undefined,{}); 
  
  
 const currentVideo = VideoData[videoIndex];
  
  const AddQuestionHandler = async () => {
     
        if (question.length === 0) {
        toast.error("Question Cannot be empty!");
        };

        if (!AddQuestionLoading && question.length !==0 ) {
        
        const contentId = VideoData[videoIndex]?._id;
        await addQuestion({question,contentId,courseId});   
        userRefetch()
        
        }
   
    };
    
    useEffect(() => {
    
        if (AddQuestionSuccess) {
        refetch();   
        setQuestion("")  
        toast.success("Question Add Successfully");
        
        socketId.emit("notification", {
          
        title: "New Question Received",
        userId: userData?._id,
        message: `You have a new Question in ${VideoData[videoIndex]?.title}`

        });  
          
          
        };
    
        if (AddQuestionError) {
        const errorMessage = AddQuestionError as any;
        toast.error(errorMessage?.data?.message);      
        };

        if (AddAnswerSuccess) {
        refetch();   
        setAnswer("");
        toast.success("Answer Add Successfully");
        
        if (userData?.role !== "admin") {
        
        socketId.emit("notification", {
          
        title: "New Reply Received",
        userId: userData?._id,
        message: `You have a new Reply in Question of video ${VideoData[videoIndex]?.title}`

        });   

        } };
    
        if (AddAnswerError) {
        const errorMessage = AddAnswerError as any;
        toast.error(errorMessage?.data?.message);      
        };
      
        if (AddReviewSuccess) {
        refetch();   
        refetchSingleCourseDetails();
        setReview("");
        toast.success("Review Added Successfully");
          
        socketId.emit("notification", {
          
        title: "New Review Received",
        userId: userData?._id,
        message: `New Review Received in Course ${course?.name}`

        });  
        
                    
       };
    
        if (AddReviewError) {
        const errorMessage = AddReviewError as any;
        toast.error(errorMessage?.data?.message);      
        };

        if (ReviewReplySuccess) {
        refetch();   
        setReviewReply("");
        toast.success("Review Reply Add Successfully");
        };
    
        if (ReviewReplyError) {
        const errorMessage = ReviewReplyError as any;
        toast.error(errorMessage?.data?.message);      
        };
      
      
      
    }, [AddQuestionSuccess,AddQuestionError,AddAnswerSuccess,AddAnswerError,AddReviewError,AddReviewSuccess,ReviewReplyError,ReviewReplySuccess])
    
    
  const handleAnswerSubmit = async (questionId: any) => {
    
  if (!AddAnswerLoading && answer !== "") {
    
  const contentId = currentVideo?._id;
  await addAnswer({ answer, questionId, courseId, contentId });

  };
    };

  
  const handleReviewSubmit = async () => {
   
    const isUserReviewExist = course?.reviews.some((eachReview: any) => {
    
      if (eachReview?.user?._id?.toString() === user._id?.toString() ) {
      
        return true;

      } else {
        
        return false;

      };
    })


    if (isUserReviewExist) {
      toast.error("You Already give a review!")
      return;
    }

    if (review !== "" && !isUserReviewExist && !AddReviewLoading) {
    await addReview({ courseId, review, rating });  
    };

  };
  
 
  const reviewReplyHandler = async (reviewId:number) => {
    
    if (reviewReply !== "" && !addReviewReplyLoading) {
   
    await addReviewReply({review:reviewReply, reviewId, courseId});  

    };
   
  };



  
  return (  
      <>
         
      <div className='w-full h-[55px] bg-slate-800 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner'>
          
     <div className='flex items-center h-full px-5'>
             
      <div className="flex justify-between h-[30px] w-full">       
      <div className={`${activeIndex===0?'text-red-700' :"" } text-[18px] cursor-pointer`} onClick={()=>setActiveIndex(0)}>
      Overview
      </div>         
     
       <div className={`${activeIndex===1?'text-red-700' :"" } text-[18px] cursor-pointer`} onClick={()=>setActiveIndex(1)}>
       Resources
      </div> 

       <div className={`${activeIndex===2?'text-red-700 ':"" } text-[18px] cursor-pointer`} onClick={()=>setActiveIndex(2)}>
       Q&A
       </div> 
              
       <div className={`${activeIndex===3?'text-red-700' :"" } text-[18px] cursor-pointer`} onClick={()=>setActiveIndex(3)}>
      Reviews
      </div> 
     </div> 
      </div>
      
      </div>
  
          
      <div className='mt-3 min-h-screen py-2'>
              
     { activeIndex === 0 ? 
                      
    <p className="text-[18px] whitespace-pre-line break-words mb-3 text-white">
    {VideoData[videoIndex]?.description}
    </p>                 
                                  
    :""}

         
    { activeIndex === 1 ? 
                      
    <div>
    
    {currentVideo?.links?.map((link: any) => (
        
                          
    <div className='flex mt-1'>
            
    <p className='text-[18px] font-bold'>{link?.title}</p>
    <p>{": "+link?.url}</p>

    </div>                                                                  
    ))}
                  
    </div>                 
                                  
    :""}

    { activeIndex === 2 ? 
                      
    <div className=' mt-1 min-h-[500px]'>
            
    <div className='h-[200px] w-full flex gap-2'> 
                         
    <div className='w-[50px]'>   {/* Image Div */}
                              
    <div className ="w-[40px] h-[40px] rounded-full">   
    <Image src={user?.avatar?.url && user?.avatar?.url || "/assests/avatardefault.jpg"} height={40} width={40}  className="w-full h-full object-cover rounded-full border:2px solid #37a39a"  alt="User Avatar" />
    </div>                                                                 
    </div>

    <div className='flex flex-col'>    {/* Main diV */}
                              
    <div>
    <textarea
            name=""
            id=""
            cols={110}
            rows={8}
            placeholder="Write your question..."
            className="w-full text-white bg-transparent border border-white/30 rounded h-[130px] pt-1 px-2 outline-none font-Poppins"
            value={question}
            onChange={(e: any) => setQuestion(e.target.value)}
    ></textarea>
   </div>

   <div className='flex justify-end'>
                                  
   <div className={`w-[150px] flex justify-center items-center h-[40px] bg-blue-700 text-center text-[#fff] rounded-xl cursor-pointer ${AddQuestionLoading&&'cursor-not-allowed'}`} onClick={() => AddQuestionHandler() }>
   Submit      
   </div>

   </div>
    </div>{/* Main div end Here */}
                          
    </div>

    <div className='h-px w-full bg-white/30'></div>                      
                  
    {/* Question / Answer Div */}

     <div className='flex flex-col'>                 

     {currentVideo?.questions.map((question: any,questionIndex:number)=>(
  
    <>
    <div className='flex mt-10 w-full'>
                          
    <div className='h-full w-[50px]'>                       
    <div className ="w-[35px] h-[35px] rounded-full">   
    <Image src={question?.user?.avatar?.url && question?.user?.avatar?.url || "/assests/avatardefault.jpg" } height={35} width={35}  className="w-full h-full object-cover rounded-full border:2px solid #37a39a"  alt="User Avatar" />
    </div> 
    </div>                

    <div className='w-full flex flex-col'>
                              
    <div className='font-bold text-[15px]'>{question?.user?.name && question?.user?.name }</div>                          
    <div className='text-[12px]'>{question?.question }</div> 
    <div className='mt-1 text-[10px] text-white/50'>{format(question?.createdAt)}</div> 
   
    <div className='flex items-center gap-2'>                  
    <div className='mt-2 text-[12px] text-white/50 cursor-pointer' onClick={() => { setActiveQuestionIndex(ActiveQuestionIndex === questionIndex?-1:questionIndex) }}>{ActiveQuestionIndex === questionIndex?"Hide Replies":"Add reply"}</div>
    <div className='flex items-center gap-1'><div><BiMessage className='text-[15px] mt-3'/></div><div className='mt-3 text-[13px]'>{question?.questionReplies?.length}</div> </div>            
    </div>

             {ActiveQuestionIndex === questionIndex ? (
           <>   
               {/*  question All Replies Map Here  */}
    {question?.questionReplies.map((eachAnswer: any) => (
       
    <div className='flex mt-5 w-full'>                      
    <div className='h-full w-[50px]'>                       
    <div className ="w-[30px] h-[30px] rounded-full">   
    <Image src={eachAnswer?.user?.avatar?.url && eachAnswer?.user?.avatar?.url || "/assests/avatardefault.jpg" } height={30} width={30}  className="w-full h-full object-cover rounded-full border:2px solid #37a39a"  alt="User Avatar" />
    </div> 
    </div> 
                   
                     <div className='w-full flex flex-col'>
                     <div className='flex gap-2'>
                     <div className='font-bold text-[14px]'>{eachAnswer?.user?.name && eachAnswer?.user?.name}</div>
                    {eachAnswer?.user?.role === "admin" ? <div className='text-blue-700 text-[18px]'><VscVerifiedFilled /></div> : ""}
                     </div>
                         
                    <div className='text-[12px]'>{eachAnswer?.answer}</div>
                    <div className='mt-1 text-[10px] text-white/50'>{format(eachAnswer?.createdAt)}</div>
                    </div>
                    </div>
                ))}
   
      <div className="w-full flex relative mt-5 text-white">   
             <input
                type="text"
                placeholder="Enter your answer..."
                value={answer}
                onChange={(e: any) => setAnswer(e.target.value)}
                className= "mt-2 outline-none bg-transparent border-b  text-white border-[#fff] p-[5px] w-[95%]" />
              <button
                type="submit"
                className="absolute right-11 bottom-1 cursor-pointer"
                onClick={() => { handleAnswerSubmit(question?._id) }}
                disabled={answer === ""}
              >
                Submit
              </button>
    </div>          
    </> 
    ): ""}

    </div>
    </div>
   
    </>
       ))}            
                          
    </div>
    </div>                 
  
    : ""}

    {activeIndex === 3 ? (
          
    <div className='mt-1 min-h-[500px]'>
            
    <div className='w-full flex flex-col'>
    <div className='flex mt-10 w-full'>
    <div className='h-full w-[50px]'>                       
    <div className ="w-[35px] h-[35px] rounded-full">   
    <Image src={"/assests/avatardefault.jpg" } height={35} width={35} className="w-full h-full object-cover rounded-full border:2px solid #37a39a"  alt="User Avatar" />
    </div> 
    </div>                

    <div className='w-full flex flex-col'>
                              
    <div className='font-bold relative w-[110px] text-[15px] h-[20px] flex gap-0'>
    <div >Give a Rating </div>
    <p className='text-red-700 text-[22px] absolute bottom-[3px] right-0'>*</p>
    </div>                          
    <div className='text-[12px] mt-1'><ManualRating rating={rating} setRating={setRating} /></div> 
    <div className='flex flex-col mt-3'>    {/* Main diV */}
                              
    <div>
    <textarea
            
    name=""
    id=""
    cols={110}
    rows={8}
    placeholder="Write your Review..."
    className="w-full text-white bg-transparent border border-white/30 rounded h-[130px] pt-1 px-2 outline-none font-Poppins"
    value={review}
    onChange={(e: any) => setReview(e.target.value)}
                        
    ></textarea>
   </div>

   <div className='flex justify-end'>
                                  
  <div className={`w-[150px] flex justify-center items-center h-[40px] bg-blue-700 text-center text-[#fff] rounded-xl cursor-pointer`} onClick={() =>{handleReviewSubmit()}} >
  Submit      
  </div>

    </div>
    </div>{/* Main div end Here */}


    <div className='h-px w-full mt-7 bg-white/50'></div>   

                    {[...course?.reviews].reverse()?.map((eachReview: any) => (
                    <div className='flex mt-10 w-full'>
                          
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
                      
                        {user.role === "admin" ?
                          
                        <div className='cursor-pointer w-fit text-[14px]' onClick={()=>setActiveReviewId(activeReviewId === eachReview?._id?-1:eachReview?._id )}>{ activeReviewId === eachReview?._id ? `Hide replies` : `Add reply` }</div>
                        
                        : ""}
                        
                     {user?.role === "admin" && activeReviewId === eachReview?._id ? (
                          
                     <>
                        
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
                            
                    <div className='flex flex-col mt-8'>    {/* Main diV */}
                              
    <div>
    <textarea
            
    name=""
    id=""
    cols={110}
    rows={8}
    placeholder="Write your Review Reply..."
    className="w-full text-white bg-transparent border border-white/30 rounded h-[130px] pt-1 px-2 outline-none font-Poppins"
    value={reviewReply}
    onChange={(e: any) => setReviewReply(e.target.value)}
                        
    ></textarea>
   </div>

   <div className='flex justify-end'>
                                  
  <div className={`w-[150px] flex justify-center items-center h-[40px] bg-blue-700 text-center text-[#fff] rounded-xl cursor-pointer`} onClick={() =>{reviewReplyHandler(eachReview?._id)}} >
  Submit      
  </div>

   </div>
    </div>{/* Main div end Here */}     
                        
                        
                        </>
                        ) : ""} 

                      </div>
                    </div>

                  ))}


    </div>
                
     </div>
     </div>

    </div>

    ):""}  
    
   </div>
          
     </>     
  )
}

interface ratingProps{

rating:number
setRating:(value:number)=>void
}


const ManualRating = ({rating,setRating}:ratingProps) => {
  
 

  return (
  <div className='flex '>
   
  {[1, 2, 3, 4,5].map((e: any) => {
  
    if(e <= rating){
      
      return (
     
               <AiFillStar onClick={()=>setRating(e)}
               key={e}
               size={20}
               color="#f6b100"
               className="mr-2 cursor-pointer"
             />
      )

    } else {
      
       return(
       <AiOutlineStar onClick={()=>setRating(e)}
       key={e}
       size={20}
       color="#f6ba00"
       className="mr-2 cursor-pointer"
       />

  )}




  })}
    

</div>
)
 }



export default CourseContentSubOptions;