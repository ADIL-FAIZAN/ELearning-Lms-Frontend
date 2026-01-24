"use client"

import { redirect } from "next/navigation";
import { useSelector } from "react-redux";


type Props = {

children:React.ReactNode

}

const UserProtectedRoute = ({ children }: Props) => {

    const {user} = useSelector((state:any) => state.auth);  

    
    
    if (user) {
    
    return (
    <>
                
    {children}
    
    </>
        
    )
    
    } else {    
    
    redirect("/");
    
    }  
    

}

export default UserProtectedRoute;