import React from 'react'
import MainUserAnalytics from './MainUserAnalytics'

type Props = {}

export const metadata = {

  title:"Admin Users Analytics",
  description:"ELearning is a platform...",
  keywords:"Programming, MERN, Redux, ML"

};


const page = (props: Props) => {
  return (
      <>
      
      <MainUserAnalytics/>
      
      </>
  )
}

export default page