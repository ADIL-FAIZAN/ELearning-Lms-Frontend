
import About from '../components/About'



type Props = {}

export const metadata = {

  title:"ELearning | About Page",
  description:"ELearning is a platform...",
  keywords:"Programming, MERN, Redux, ML"

};


const page = (props: Props) => {



  return (
  
  <>

  <About/>          
 
  </>
  )
}

export default page;