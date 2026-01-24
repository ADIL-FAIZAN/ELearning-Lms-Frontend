import MainFaq from '../../components/AdminComponents/Faq/MainFaq';


type Props = {}

export const metadata = {

  title:"Admin | Faq",
  description:"ELearning is a platform...",
  keywords:"Programming, MERN, Redux, ML"

};



const page = (props: Props) => {


  return (
    
      <div><MainFaq/></div>
  
  )
}

export default page