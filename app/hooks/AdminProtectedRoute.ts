"use client"

import { redirect } from "next/navigation";
import { useSelector } from "react-redux";


type Props = {

children:React.ReactNode

}

const AdminProtectedRoute = ({ children }: Props) => {

    const { user } = useSelector((state: any) => state.auth);
    
    if (user.role === "admin") {
    
        return (
                        
            { children }

        )
    
    } else {
    
        redirect("/");
    
    }
    
};

export default AdminProtectedRoute;