import React, { FC } from "react";
import MainPageComponents from "./components/MainPageComponents";


export const metadata = {

  title:"ELearning",
  description:"ELearning is a platform...",
  keywords:"Programming, MERN, Redux, ML"

};

interface Props { };

const Page:FC<Props> = (props) => {

  
  
 return (
 <>
     
     
     <MainPageComponents /> 
 

     
  </>
  ) 
 };

export default Page;