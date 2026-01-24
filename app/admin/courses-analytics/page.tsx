import MainCourseAnalytics from "./MainCourseAnalytics";


type Props = {}

export const metadata = {

  title:"Admin Course Analytics",
  description:"ELearning is a platform...",
  keywords:"Programming, MERN, Redux, ML"

};



const page = (props: Props) => {


  return (
  
      <>
      
          <MainCourseAnalytics/>
      
      </>
  
  )
}

export default page;