import MainAllCourses from '../../components/AdminComponents/AllCourses/MainAllCourses';
import React from 'react'
type Props = {}

export const metadata = {

  title:"Admin | Courses",
  description:"ELearning is a platform...",
  keywords:"Programming, MERN, Redux, ML"

};



const page = (props: Props) => {

    return (
      
       <MainAllCourses/>
        
  )
}

export default page