import { AiOutlinePlusCircle } from "react-icons/ai";


type Props = {

  benefits: any,
  setBenefits: (value: any) => void,
  prerequisites:any,
  setPrerequisites: (value: any) => void,
  activeItem: number,
  setActiveItem: (value: any)=> void

}

const CourseData = ({ benefits, setBenefits, prerequisites, setPrerequisites, activeItem, setActiveItem }: Props) => {
  
   const handleSubmit = (e: any) => {
    
   e.preventDefault();
     setActiveItem(3);     

    };

  
  const handlePrev = () => {
    setActiveItem(1);

  };
  

  const handleBenefitChange = (value:any , index:number,benefits:any,setBenefits:any) => {
    
    const updatedBenefits = benefits?.map((e:any, i:number) => {
   
      if (i == index) {
     
       return { ...e,title:value };
     
      } else {
        return e;

      };
})
  
    setBenefits([...updatedBenefits])
  };
  
  const handleAddBenefit = (benefits:any,setBenefits:any) => {
    
    setBenefits([...benefits, { title: "" }]);

  };

  
const handlePrerequisteChange = (value:any , index:number,prerequisites:any,setPrerequisites:any) => {
    
  const updatedPrerequisites = prerequisites?.map((e: any, i: number) => {
   
    if (i == index) {
     
      return { ...e, title: value };
     
    } else {
        return e;

      };
  });

    setPrerequisites([...updatedPrerequisites])
  };


    const handleAddPrerequiste = (Prerequisites:any,setPrerequisites:any) => {
    
    setPrerequisites([...Prerequisites, { title: "" }]);

  };




  
  return (

    <div className="min-lg:px-10">
      
   <form onSubmit={handleSubmit}>
        {/* Course name input */}
        <div>
          <label htmlFor="" className="text-[18px] font-poppins text-white">
            What are the benefits for students in this course 
          </label>

          {benefits?.map((e:any,index:number) => (
          <>
          <input
            type="name"
            name=""
            required
            value={e?.title}
            onChange={(e: any) =>{handleBenefitChange(e?.target?.value,index,benefits,setBenefits)}}
            id="name"
            placeholder="You will be able to build full stack LMS platform..."
            className="w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
          />
          
            </>
          ))}
          
          <AiOutlinePlusCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
            onClick={() => { handleAddBenefit(benefits,setBenefits) }}
        />
         


        </div>
        <br />
    
        

         <div>
          <label htmlFor="" className="text-[18px] font-poppins text-white">
            What are the Prerequistes for students to take this course 
          </label>

          {prerequisites?.map((e:any,index:number) => (
          <>
          <input
            type="name"
            name=""
            required
            value={e?.title}
            onChange={(e: any) =>{handlePrerequisteChange(e?.target?.value,index,prerequisites,setPrerequisites)}}
            id="name"
            placeholder="You will be able to build full stack LMS platform..."
            className="w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
          />
          
            </>
          ))}
          
          <AiOutlinePlusCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
            onClick={() => { handleAddPrerequiste(prerequisites,setPrerequisites) }}
        />
         
        </div>
        <br />
        
        <div className="w-full flex justify-between" >
          
        <div className="w-[150px] flex justify-center items-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded cursor-pointer" onClick={handlePrev}>
        Prev 
        </div>
        
           <div>
          <input
            type="submit"
            value="Next"
            className="w-[150px]  h-[40px] bg-[#37a39a] text-center text-[#fff] rounded cursor-pointer" />
        </div>


    </div>
    </form>     

    </div> 
  
  )
}

export default CourseData