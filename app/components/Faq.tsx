"use client"

import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useGetLayoutQuery } from '../../redux/features/layoutApi'
import toast from 'react-hot-toast'
import Loader from './Loader/Loader'
import { styles } from "../styles/styles";
import { HiMinus, HiPlus } from 'react-icons/hi'



type Props = {

    isPage:boolean

}

const Faq = ({isPage}: Props) => {
   
  const [route, setRoute] = useState("Login");
  const [open,setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(4);  
  const {data,error,isLoading} = useGetLayoutQuery("FAQ");   
  const [questions, setQuestions] = useState<any[]>([]);

    useEffect(() => {
        
   if (data) {
      setQuestions(data.layout.faq);
    }
  
  }, [data]);  


  const toggleQuestion: any = (id: any) => {
      
    setQuestions((prevQuestion) =>
      
    prevQuestion.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    
    );
  };  
    
    

  return (
  
      <>
        
        {isPage ?
          
        <>
        <Header open={open} setOpen={setOpen} activeItem={activeItem} route={route} setRoute={setRoute} />          
        </>
        
        : ""}


          {isLoading ?
          
          <Loader /> :(
    
          <div className='w-full px-5 min-md:px-20'>

          <div className='flex flex-col items-center w-full'>
          
          <div>   
          <p className='font-bold font-Poppins leading-[35px] text-xl sm:text-3xl xl:text-3xl mt-10 text-white tracking-tight'>Frequently Asked Questions</p>
          </div>                   
                              
          <div className="w-full mt-[20px]  min-xl:flex min-xl:justify-center">
                    
                      <div className="mt-12 w-full min-xl:w-[1000px]">
                      <dl className="w-full">
                        {questions?.map((q: any) => (
                          <div
                            key={q._id}
                            className={`${
                              q._id !== questions[0]?._id && "border-t"
                            } border-gray-200 pt-6 w-full`}
                          >
                            <dt className="text-lg ">
                              <button
                                className="flex items-start text-white justify-between w-full text-left focus:outline-none"
                                onClick={() => toggleQuestion(q._id)}
                              >
                                <input
                                  className={`${styles.input} border-none cursor-pointer`}
                                  value={q.question}
                                  
                                  
                                />
          
                                <span className="ml-6 flex-shrink-0 cursor-pointer">
                                  {q.active ? (
                                    <HiMinus className="h-6 w-6" />
                                  ) : (
                                    <HiPlus className="h-6 w-6" />
                                  )}
                                </span>
                              </button>
                            </dt>
                            {q.active && (
                              <dd className="mt-2 pr-12 cursor-pointer">
                                <input
                                  className={`${styles.input} cursor-pointer border-none`}
                                  value={q.answer}
                            
                                />
                                
                              </dd>
                            )}
                          </div>
                        ))}
                      </dl>
                      <br />
                      <br />
                     
                    </div>
                    </div>



          </div>                    
          </div>
          
          
              
              )}
    </>
  )
}

export default Faq