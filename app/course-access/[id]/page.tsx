import CourseAccess from '../../components/CourseAccess';


type Props = {}

export const metadata = {

  title:"ELearning | Course Access Page",
  description:"ELearning is a platform...",
  keywords:"Programming, MERN, Redux, ML"

};


const page = async ({ params }: { params: Promise<{ id: string }> }) => {

  let courseId:any = await params;
  courseId = courseId?.id;

  
    
    
  return (
  
      <>
    
      <CourseAccess courseId={courseId} />    
      
      </>
 
  )
}

export default page;