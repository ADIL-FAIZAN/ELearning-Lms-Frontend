"use client"

import { styles } from "../../../styles/styles";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import Loader from "../../Loader/Loader";
import { useGetLayoutQuery,useEditLayoutMutation, useEditFaqMutation } from '../../../../redux/features/layoutApi';


type Props = {}

const EditFaq = (props: Props) => {
   
    const {data,error} = useGetLayoutQuery("FAQ");    
   
     const [editFaq,{ isLoading, isSuccess: layoutSuccess, error:layoutError }] = useEditFaqMutation();
     const [questions, setQuestions] = useState<any[]>([]);
    
    
  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
    if (layoutSuccess) {

      toast.success("Faq-updated successfully!");
      }
      
 if (error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message);
    }

    if (layoutError && "data" in layoutError) {
      const errorData = layoutError as any;
      toast.error(errorData?.data?.message);
    }
  }, [data, layoutSuccess, layoutError,error]);
  //setting the clicked question to active/inactive
    const toggleQuestion: any = (id: any) => {
      
    setQuestions((prevQuestion) =>
      
    prevQuestion.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    
    );
  };
  //the question which we edidted-just set new value
    const handleQuestionChange = (id: any, value: string) => {
      
    setQuestions((prevQuestion) =>
      
        prevQuestion.map((q) => (q._id === id ? { ...q, question: value } : q))
    
    );
  };
   //the question which we edidted-just set new value
  const handleAnswerChange = (id: any, value: string) => {
    setQuestions((prevQuestion) =>
      prevQuestion.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };
  const newFaqHandler = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        answer: "",
      },
    ]);
  };


  const areQuestionsUnchanged = (originalQuestions: any[],newQuestions: any[]) => {
    
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  
  };
  
  const isAnyQuestionEmpty = (questions: any[]) => {
  
    return questions.some((q) => q.question === "" || q.answer === "");
  
  };

  const handleEdit = async () => {
    if (
      !areQuestionsUnchanged(data.layout.faq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await editFaq({
          
        type: "FAQ",
        faq: questions,
      });
    }
  };




    return (
      
     <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-screen w-[90%] 800px:w-[80%] m-auto mt-[20px]">
          <div className="mt-12">
            <dl className="space-y-8">
              {questions?.map((q: any) => (
                <div
                  key={q._id}
                  className={`${
                    q._id !== questions[0]?._id && "border-t"
                  } border-gray-200 pt-6`}
                >
                  <dt className="text-lg">
                    <button
                      className="flex items-start text-white justify-between w-full text-left focus:outline-none"
                      onClick={() => toggleQuestion(q._id)}
                    >
                      <input
                        className={`${styles.input} border-none`}
                        value={q.question}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleQuestionChange(q._id, e.target.value)
                        }
                        placeholder={"Add your question..."}
                      />

                      <span className="ml-6 flex-shrink-0">
                        {q.active ? (
                          <HiMinus className="h-6 w-6" />
                        ) : (
                          <HiPlus className="h-6 w-6" />
                        )}
                      </span>
                    </button>
                  </dt>
                  {q.active && (
                    <dd className="mt-2 pr-12">
                      <input
                        className={`${styles.input} border-none`}
                        value={q.answer}
                        onChange={(e: any) =>
                          handleAnswerChange(q._id, e.target.value)
                        }
                        placeholder={"Add your answer..."}
                      />
                      <span className="ml-6 flex-shrink-0">
                        <AiOutlineDelete
                          className="text-white  text-[18px] cursor-pointer"
                          onClick={() => {
                            setQuestions((prevQuestions) =>
                              prevQuestions.filter((item) => item._id !== q._id)
                            );
                          }}
                        />
                      </span>
                    </dd>
                  )}
                </div>
              ))}
            </dl>
            <br />
            <br />
            <IoMdAddCircleOutline
              className="text-white text-[25px] cursor-pointer"
              onClick={newFaqHandler}
            />
              </div>
              <div className="w-full flex justify-end mt-10 mb-10">
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] text-white bg-[#cccccc34] 
              ${
                areQuestionsUnchanged(data?.layout?.faq, questions) ||
                isAnyQuestionEmpty(questions)
                  ? "!cursor-not-allowed"
                  : "!cursor-pointer !bg-[#42d383]"
              }
              !rounded `}
            onClick={
              areQuestionsUnchanged(data?.layout?.faq, questions) ||
              isAnyQuestionEmpty(questions)
                ? () => null
                : handleEdit
            }
          >
            Save
                </div>
              </div>
        </div>
      )}
    </>
        

    )
}

export default EditFaq