"use client";
import { useGetLayoutQuery } from "../../redux/features/layoutApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";



const Hero = () => {

  const { data } = useGetLayoutQuery("Banner");  
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [search, setSearch] = useState("");
  const router = useRouter();


    useEffect(() => {
    
if (data) {
    
setImage(data?.layout?.banner?.image?.url);
setTitle(data?.layout?.banner?.title);
setSubTitle(data?.layout?.banner?.subTitle);

}     

    }, [data]);



  const handleSearch = (e: any) => {
    e.preventDefault();
    if (search === "") {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
    };
    

  return (
    <>
      {data ? (
            
        <div className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 lg:px-8 py-10 lg:py-0 relative overflow-hidden">
          {/* Animated background circle */}
          <div className="absolute  max-md  max-lg:top-[50px] lg:left-[60px] xl:left-[100px] max-md:w-[300px] max-md:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px] hero_animation rounded-full opacity-20 lg:opacity-30"></div>
          {/* Hero banner Image */}
          <div className="max-md:w-[280px] max-md:h-[280px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px] lg:w-1/2 flex items-center justify-center z-10 md:mr-0 md:mt-5 max-md:mt-[50px] lg:ml-[40px]  xl:ml-[100px]   mb-18 ">
            
          <Image
                src={image}
                width={300}
                height={300}
                alt="Hero Banner"
                className="object-contain w-full max-w-full lg:max-w-[300px] h-auto"
          />
            
          </div>
          {/* Hero content section */}
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10 max-lg:mt-14">
            {/* Main headline */}
            <h1 className="text-3xl lg:text-5xl font-bold  text-white mb-4 leading-tight">
            {title}
            </h1>
            {/* Subtitle or description */}
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
            {subTitle}
            </p>

            {/* Search form */}
            <form onSubmit={handleSearch} className="w-full max-w-md mb-8">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search Courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-12 px-4 pr-12 text-lg text-gray-700 bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="submit"
                  onClick={handleSearch}
                  className="absolute right-0 top-0 h-12 w-12 flex items-center justify-center bg-blue-500 rounded-r-lg hover:bg-blue-600 transition-colors"
                >
                  <BiSearch className="text-white" size={24} />
                </button>
              </div>
            </form>
            {/* Trust indicators - client avatars and text */}
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                <Image
                src={require("../../public/assests/client-1.jpg")}
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-full"
                />

                <Image
                  src={require("../../public/assests/client-2.jpg")}
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-full ml-[-10px]"
                />

                <Image
                  src={require("../../public/assests/client-3.jpg")}
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-full ml-[-10px]"
                />
              </div>

              <p className="text-sm text-gray-300">
                <span className="font-semibold">500K+</span> People already
                trust us.{" "}
                <Link href="/courses" className="text-green-500 hover:underline">
                  View Courses
                </Link>
              </p>
            </div>
          </div>
        </div>
 
        
        
        
        ):""}
    </>
  );
};


export default Hero;