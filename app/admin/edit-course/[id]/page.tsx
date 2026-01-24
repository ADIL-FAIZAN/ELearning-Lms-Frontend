import MainEditCourse from "../../../components/AdminComponents/MainEditCourse";
import axios from "axios";



export const metadata = {

  title:"Admin | Edit Course",
  description:"ELearning is a platform...",
  keywords:"Programming, MERN, Redux, ML"

};


const fetchCourseDetail = async (courseId:string) => {
    

    try {

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}course/get-courseDetail/${courseId}`);
        return data?.course;
    
    } catch (err: any) {
        
        console.log(err)
    }
        
};



const page = async ({ params }: { params: Promise<{ id: string }> }) => {

 let courseId:any = await params;
   
 courseId = courseId?.id;
  
 const courseAllData = await fetchCourseDetail(courseId);      

  return (
    
      <div>
          <MainEditCourse courseAllData={courseAllData} courseId={courseId}  />
      </div>
  
  )
}

export default page