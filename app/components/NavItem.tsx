"use client"
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import { HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "./Auth/login";
import Signup from "./Auth/Signup";
import Verification from "./Verification";
import Image from "next/image";



const arr = [    
    {

    name: "Home",
    url: "/"
        
    },

    {
    
    name: "Courses",
    url: "/courses"
        
    },
         
    {
    
    name: "About",
    url: "/about"
        
    },
        
    {

    name: "Policy",
    url: "/policy"
        
    },
       
    {

    name: "FAQ",
    url: "/faq"
        
    }
];


interface Props{

 activeItem:number, 
 isMobile:boolean,
 setOpenSidebar: (value: boolean) => void,
 setAuthenticationPopUp: (value: boolean) => void,
 setOpen:(value: boolean) => void,
 open : boolean,
 route: string,
 setRoute: (open: string) => void,
 user:any   
    
};

const NavItem = ({user,activeItem,isMobile,setOpenSidebar,setAuthenticationPopUp,setOpen,open,route,setRoute}: Props) => {

  
    return (
      
        <div className="w-full h-full flex max-lg:flex-col max-lg:gap-8 gap-10 max-lg:ml-[10px] max-lg:mt-[50px] text-white">
                
        {arr.map((e, index) => (
                
        <Link href={e.url}>
        <span className={`max-lg:text-[15px] text-[17px] font-Poppins ${activeItem === index ? "text-[#37a39a]" : "text-white"}`}>
        {e.name}
        </span>
        </Link>

        ))}
            
        
       
        {!user ? (

          <HiOutlineUserCircle onClick={() => { setOpenSidebar(false); setOpen(true) }}
            size={23}
            className="cursor-pointer text-white"
          />
        
        ) : (
            
          <Link href={"/Profile"}>
              <div className = "w-[30px] h-[30px] rounded-full">   

                <Image src={user?.avatar?.url || "/assests/avatardefault.jpg"} height={30} width={30} style={{ border: activeItem == 6 ? "2px solid #37a39a" : "" }}  className="w-[30px] h-[30px] object-cover rounded-full"  alt="User Avatar" />

          </div>
          </Link>
        
        )}




       <div className="min-lg:hidden"> Copyrigt ©️ 2025 E-Learning</div>

             
   {route === "Login" && open && (
        
          <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
          
        />
    )}
            
    {route === "Sign-Up" && open && (

    <CustomModal
                    
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Signup}
                    
    />
    
    )}
  
    {route === "Verification" && open && (

          <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Verification}
        
          />
    )}  
     
      </div>  
  )
}

export default NavItem;