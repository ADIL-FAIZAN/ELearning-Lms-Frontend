"use client";
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

interface Props { };

const ThemeSwitcher = (props: Props) => {
 const { theme, setTheme } = useTheme();
 const [mounted, setMounted] = useState(false);
    
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
    
 return (
    
 <div className="text-black">
          
        {theme === "light" ? (        
         
         <BiMoon
                 
         className="cursor-pointer"
         fill="black"
         size={30}
         onClick={() => setTheme("dark")}
             
         />      

         ) : (
         
        <BiSun
        
        className="cursor-pointer"
        onClick={() => setTheme("light")}
        size={24}
        fill="white" 
                                    
         />
                 
         )
        }
          
 </div>
  
    )
};


export default ThemeSwitcher;