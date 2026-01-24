"use client"

import { useEffect, useState } from 'react';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

type Props = {

  setRoute: (route: string) => void;
  setOpen:  (route: boolean) => void;

}

const Login = ({setRoute,setOpen }: Props) => {

 const [login,{isError,data,error,isSuccess}] = useLoginMutation();
 const [password, setPassword] = useState(""); 
 const [email, setEmail] = useState(""); 
 const [toggle0, settoggle0] = useState(false);   
  
 const schema = Yup.object().shape({   
 email: Yup.string().email("Invalid Email!").required("Please Enter Your Email!"),
 password: Yup.string().required("Please Enter Your Password!").min(6)
 
 }); 
    
 interface dataType{
  
  email: string,
  password:string  

  }
    
  const formik = useFormik({
      
  initialValues: { email: "", password: "" },
  validationSchema: schema,
      
  onSubmit: async ({ email, password }:dataType) => {
  
  const data = { email, password};  
  await login(data);   
    
  }
      
  });
  

  const { errors, touched, values, handleChange, handleSubmit } = formik; 
  
  useEffect(() => {
      
    if (isSuccess) {
      
    const message = data.message || "Login Successful";
    toast.success(message);
    setOpen(false);
      
    }
  
    if (error) {
      
    if ("data" in error) {
  
    const errorData = error as any;
    toast.error(errorData.data.message);  
  
    };
  };
  
    },[isSuccess,error]);
  
  

 return (
      
    <div className='flex justify-center items-center'>
    <div className='w-[370px] bg-gray-900 h-[460px] rounded px-3 pt-2'>  
    <div className='flex justify-center text-[21px] font-semibold'>Login with ELearning</div>

    <form onSubmit={handleSubmit}>
    <div className="w-full mt-3">
    <label className="block pb-1 text-[15px]">Enter Your Email </label>
    <input type="text"
    value={values.email}
    className='mt-1 w-full border-2 pl-2 bg-gray-800 text-white border-gray-200 h-[37px] rounded'
    onChange={handleChange}
    id="email"
    placeholder="loginemail@gmail.com"
    />
      {errors.email && touched.email && (
          <span className="text-red-500 pt-1 block">{errors.email}</span>
        )}   
    </div>  

        <div className="w-full mt-3">
              
            <label className="block pb-2 text-[15px]">Enter Your Password</label>
          
              <div className='relative'>
              <input className='mt-1 w-full border-2 pl-2  bg-gray-800 text-white border-gray-200 h-[37px] rounded'
             value={values.password}
             type={toggle0 == false ? "password" : "text"}
             onChange={handleChange}
             id="password"
             placeholder="passwords!@#%"
              />

              <div className='absolute right-2 cursor-pointer bottom-2 text-[20px] mb-[3px]' onClick={() => settoggle0(!toggle0)}>

                {toggle0 == false ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}

            </div>
            </div>

         {errors.password && touched.password && (
          <span className="text-red-500 pt-1 block ">{errors.password}</span>
        )}

            </div>

         <div className='flex mt-5'>
          
        <button className="rounded-2xl flex w-full mt-1 h-10 items-center cursor-pointer justify-center font-bold  ml-1 bg-blue-500" type='submit'>Login</button>

        </div>
        </form>
       
    <div className='flex justify-center mt-7'>Or Join with</div>
         <div className="flex items-center justify-center my-3 ">
          <FcGoogle
            className="cursor-pointer mr-2"
            size={30}
             onClick={() => signIn("google")}
          />
          <AiFillGithub
            className="cursor-pointer mr-2"
            size={30}
             onClick={() => signIn("github")}
          />
        </div>

    <div className='flex justify-center'>Not have any account?<p className='text-blue-500 ml-2 cursor-pointer' onClick={() => setRoute("Sign-Up")}
       >sign up</p>
       </div>
    
     
     </div>
    </div>
 )
}

export default Login