import CourseDetail from '../../components/CourseDetail';
import axios from 'axios';
import React from 'react'

export const metadata = {

  title:"ELearning | Course Detail",
  description:"ELearning is a platform...",
  keywords:"Programming, MERN, Redux, ML"

};

type Props = {}


const page = async ({ params }: { params: Promise<{ id: string }> }) => {

    let courseId:any = await params;
    courseId = courseId?.id;

    return (

    <div>
            
    <CourseDetail courseId={courseId} />
            
    </div>

    )

}

export default page