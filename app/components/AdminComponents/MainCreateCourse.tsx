"use client";

import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import CreateCourseOption from "./CreateCourseOption";
import CourseInformation from "./CreateCourse/CourseInformation";
import CourseData from "./CreateCourse/CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import toast from "react-hot-toast";
import { useAllCoursesDataQuery, useCreateCourseMutation } from "../../../redux/features/courseApi";
import { redirect } from "next/navigation";
import AdminDashboardHeader from "./AdminDashboardHeader";
import { useRouter } from "next/navigation";

type Props = {};

  const MainCreateCourse = (props: Props) => {
  
  const router = useRouter();  
  const [activeItem, setActiveItem] = useState(1);
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseData, setCourseData] = useState({});
  const [createCourse, {isSuccess,isError,isLoading,error }] = useCreateCourseMutation();
  const {data:AllCoursesData,isLoading:AllCoursesDataLoading,refetch:AllCoursesRefetch } = useAllCoursesDataQuery(undefined,{refetchOnMountOrArgChange:true});
  const [courseInfo, setCourseInfo] = useState({
    
    name: "",
    description: "",
    categories:"",
    price: 0,
    estimatedPrice: 0,
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  
  });

  const [courseContentData, setCourseContentData] = useState([
  
    {
      videoUrl: "",
      title: "",
      description: "",
      videoLength: "",
      videoSection: "1.untitled Section",
      links: [{ title: "", url: "" }],
      suggestion: "",
    },
  
  ]);

    const handleCourseSubmit = (e: any) => {
    
      e.preventDefault();
      
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    }

    const formattedBenefits = benefits?.map((e) => ({ title: e?.title }));
    const formattedPrerequistes = prerequisites?.map((e) => ({title: e?.title}));

    const formattedCourseContentData = courseContentData.map((e) => ({

      videoUrl: e?.videoUrl,
      title: e?.title,
      videoSection: e?.videoSection,
      description: e?.description,
      videoLength: e?.videoLength,
      links: e.links.map((e) => ({ title: e?.title, url: e?.url })),
      suggestion: e.suggestion,

    }));

    const data = {

      name: courseInfo?.name,
      description: courseInfo?.description,
      categories: courseInfo?.categories,
      price: courseInfo?.price,
      estimatedPrice: courseInfo?.estimatedPrice,
      thumbnail: courseInfo?.thumbnail,
      tags: courseInfo?.tags,
      level: courseInfo?.level,
      demoUrl: courseInfo?.demoUrl,
      benefits:formattedBenefits,
      prerequistes:formattedPrerequistes,
      courseData:formattedCourseContentData

    };
      
      setActiveItem((prev)=>prev+1);
      setCourseData(data);       
      
  };

    
    
    const createCourseHandler = async() => {

      if (!isLoading) {
      
       await createCourse(courseData);

       }
      
    };
    

  async function fetchAllCourses(){
      
    await AllCoursesRefetch();
    router.push("/admin/courses");
    };


    useEffect(() => {
      
    if (isSuccess) {
  
      toast.success("Course created successfully");
      fetchAllCourses();
      

      };

      if (isError) {
       
      const errorMessage = error as any;

      toast.error(errorMessage?.data?.message)


     }


    },[isSuccess,isError])
  
    

  return (
    
    <>
       <div className="w-full max-md:pr-3 md:px-10">
      <AdminDashboardHeader />  
      </div>
      
    <div className="flex w-full">
      
    <div className="w-[20%] ">
    <AdminSidebar />
    </div>

      <div className="w-full flex max-md:flex-col-reverse">
      <div className="max-sm:w-[100%] w-[80%] mt-10 px-5">
       
        {activeItem === 1 ? (
          <>
            {" "}
            <CourseInformation
              
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            setActiveItem={setActiveItem}

            />{" "}
          </>
        ) : (
          ""
        )}
        {activeItem === 2 ? (
          <>
            {" "}
            <CourseData
              benefits={benefits}
              setBenefits={setBenefits}
              prerequisites={prerequisites}
              setPrerequisites={setPrerequisites}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />{" "}
          </>
        ) : (
          ""
        )}
        {activeItem === 3 ? (
          <>
            {" "}
            <CourseContent
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              courseContentData={courseContentData}
              setCourseContentData={setCourseContentData}
              handleCourseSubmit={handleCourseSubmit}
            />{" "}
          </>
        ) : (
          ""
        )}

        {activeItem === 4 ? (
          <>
            {" "}

            <CoursePreview
              
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              createCourseHandler={createCourseHandler}
              courseData={courseData}

            />{" "}
          </>
        ) : (
          ""
        )}

      </div>

    <div className="min-lg:w-[15%]  min-lg:h-[500px] max-md:hidden mt-10 flex ">
    <CreateCourseOption activeItem={activeItem} />
    </div>
    </div>
    </div>

 </>

      );
};

export default MainCreateCourse;
