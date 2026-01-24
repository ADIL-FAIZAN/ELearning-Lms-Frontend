import MainCreateCourse from "../../components/AdminComponents/MainCreateCourse";

type Props = {}

export const metadata = {

  title:"ELearning | Admin",
  description:"ELearning is a platform...",
  keywords:"Programming, MERN, Redux, ML"

};


const page = (props: Props) => {




    return (

    <div>
            
    <MainCreateCourse/>     
            
    </div>
  )
}

export default page