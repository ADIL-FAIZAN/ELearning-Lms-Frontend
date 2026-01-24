"use client"

import { useAllCoursesDataQuery, useCreateCourseMutation, useEditCourseMutation } from "../../../redux/features/courseApi";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminSidebar from "./AdminSidebar";
import CourseInformation from "./CreateCourse/CourseInformation";
import CourseData from "./CreateCourse/CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import CreateCourseOption from "./CreateCourseOption";
import AdminDashboardHeader from "./AdminDashboardHeader";


type Props = {

    courseAllData: any,
    courseId:string

}

interface CourseContent  {
  videoUrl: string,
  title: string,
  description: string,
  videoLength: number,
  videoSection: string,
  links: any[],
  suggestion: string
};


const MainEditCourse = ({courseAllData,courseId}: Props) => {

  const router = useRouter();  
  const {data:AllCoursesData,isLoading:AllCoursesDataLoading,refetch:AllCoursesRefetch } = useAllCoursesDataQuery(undefined,{refetchOnMountOrArgChange:true});
  const [activeItem, setActiveItem] = useState(1);
  const [benefits, setBenefits] = useState(courseAllData?.benefits);
  const [prerequisites, setPrerequisites] = useState(courseAllData?.prerequistes);
  const [courseData, setCourseData] = useState({});
  const [editCourse, {isSuccess,isError,isLoading,error }] = useEditCourseMutation(); 
  const [courseInfo, setCourseInfo] = useState({
    
    name: courseAllData?.name,
    description: courseAllData?.description,
    price: courseAllData?.price,
    estimatedPrice: courseAllData?.estimatedPrice,
    tags: courseAllData?.tags,
    level: courseAllData?.level,
    demoUrl: courseAllData?.demoUrl,
    thumbnail: courseAllData?.thumbnail?.url,
  });

  const [courseContentData, setCourseContentData] = useState<CourseContent[]>([]);
   

    useEffect(() => {
        
      const formattedCourses = [];

        for (let i = 0; i < courseAllData?.courseData?.length; i++){
            
          formattedCourses.push({
            
            videoUrl: courseAllData?.courseData[i].videoUrl,
            title: courseAllData?.courseData[i].title,
            description: courseAllData?.courseData[i].description,
            videoLength: courseAllData?.courseData[i].videoLength,
            videoSection: courseAllData?.courseData[i].videoSection,
            links: courseAllData?.courseData[i].links,
            suggestion: courseAllData?.courseData[i].suggestion,
            
          });

      };
      
      setCourseContentData(formattedCourses);

    }, [courseAllData?.courseData]);
    
    
    
    
    const handleCourseSubmit = (e: any) => {
    
      e.preventDefault();
      
    if (
      courseContentData[courseContentData.length - 1].title === "" as any ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === ""  ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    }

    const formattedBenefits = benefits?.map((e:any) => ({ title: e?.title }));
    const formattedPrerequistes = prerequisites?.map((e:any) => ({title: e?.title}));

    const formattedCourseContentData = courseContentData.map((e:any) => ({
      videoUrl: e?.videoUrl,
      title: e?.title,
      videoSection: e?.videoSection,
      description: e?.description,
      videoLength: Number(e?.videoLength),
      links: e.links.map((e:any) => ({ title: e?.title, url: e?.url })),
      suggestion: e.suggestion,
    }));

    const data = {

      name: courseInfo?.name,
      description: courseInfo?.description,
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

        
    const createCourseHandler = async () => {

      if (!isLoading) {     
      
      await editCourse({ courseData, courseId });
      
      };
        
    };
    
    async function fetchAllCourses(){
      
    await AllCoursesRefetch();
    router.push("/admin/courses");
    };
    
    useEffect(() => {
      
    if (isSuccess) {
  
      toast.success("Course Edit successfully");
      fetchAllCourses();

      };

      if (isError) {
       
      const errorMessage = error as any;

      toast.error(errorMessage?.data?.message)


     }


    },[isSuccess,isError])
    
  return (

<>

 <div className="px-10">
          <AdminDashboardHeader/>
          </div>


    <div className="grid grid-cols-12">
    
         

      <div className="col-span-2">
        <AdminSidebar />
      </div>

      <div className="col-span-10 min-lg:col-span-8 mt-10 px-10">
       
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
              isEdit={true}
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

      <div className="col-span-2 max-lg:hidden h-[500px] mt-10">
        <CreateCourseOption activeItem={activeItem} />
      </div>
    </div>

  </>
  )
}

export default MainEditCourse