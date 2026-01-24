import React from 'react'
import MainFaq from '../components/AdminComponents/Faq/MainFaq';
import Faq from '../components/Faq';
import Footer from '../components/Footer';

type Props = {}


export const metadata = {

  title:"ELearning | FAQ",
  description:"ELearning is a platform...",
  keywords:"Programming, MERN, Redux, ML"

};


const page = (props: Props) => {

    

  return (
    
      <div>
      <Faq isPage={true} />

      <div className="mt-10">
      <Footer/>      
      </div>
      
      </div>
  
  )
}

export default page