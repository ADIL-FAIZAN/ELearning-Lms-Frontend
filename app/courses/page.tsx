import { Suspense } from "react";
import AllCourses from "./AllCourses";

type Props = {}

  export const metadata = {

  title:"ELearning | All Courses",
  description:"ELearning is a platform...",
  keywords:"Programming, MERN, Redux, ML"

  };


const page = (props: Props) => {


    
  return (
    <>
      <Suspense fallback={<div>Loading courses...</div>}>
      <AllCourses />
    </Suspense>
    
    </>
  )
}

export default page;