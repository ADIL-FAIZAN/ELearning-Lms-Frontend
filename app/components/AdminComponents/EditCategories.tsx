"use client"

import { useEditCategoriesMutation, useGetLayoutQuery } from '../../../redux/features/layoutApi';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineDelete, AiOutlineFileAdd, AiOutlinePlusCircle } from 'react-icons/ai'
import Loader from '../Loader/Loader';

type Props = {};

interface Category{

    title: string

}

const EditCategories = (props: Props) => {

const {data} = useGetLayoutQuery("Categories");         
const [categories, setCategories] = useState<Category[]>([]);
const [title, setTitle] = useState("");
const [subTitle, setSubTitle] = useState("");
const [editCategories, { isError, isLoading, isSuccess, error }] = useEditCategoriesMutation();
    
    
    useEffect(() => {
    
    setCategories(data?.layout?.categories);
     
    }, [data]);    
    

    const handleAddCategory = () => {
     
        if (categories[categories.length - 1].title !== "") {
        
        setCategories([...categories, { title: "" }]);

        } else {
            
        toast.error("Kindly Fill Last Category Field!")
    
        }

    }

    useEffect(() => {
    

        if (isSuccess) {
    
        toast.success("Category Updated Successfully");

       }

        if (isError) {
        const errorMessage = error as any;
        toast.error(errorMessage?.data?.message);
        }
        

    }, [isSuccess,isError]);


     const areCategoriesUnchanged = (original: any, current: any) => {
    if (!original || !current) return true;
    return JSON.stringify(original) === JSON.stringify(current);
  };
   


    return (
      
<>
{!isLoading?(


        <div className='min-h-screen'>
        <div className='flex justify-center items-center my-[100px]'>
        <div className= "w-[250px]">
        <div className='flex justify-center mb-10'>
            
        <p className='font-bold text-[25px]'>All Categories</p>
       
        </div>

              
        {categories?.length > 0 ? (
        <div className='flex flex-col gap-10'> 
                        
        {categories.map((e: any,index:number) => (
                   
        <div className='flex justify-between items-center'>

                <input
                    
                    className='font-poppins text-[20px] border-none outline-none w-[180px]'
                    placeholder='Enter New Category Here...'
                    value={e?.title}
                    onChange={(e: any) => {

                    const value = e.target.value;

                    let updatedCategory = [...categories];    

                    updatedCategory = updatedCategory.map((eachCategory: any, i: number) => {
                        
                            if (i === index) {
                            
                                eachCategory = { ...eachCategory, title: value };
                                return eachCategory
                            
                            } else {
                                return eachCategory;

                            }

                        });
                        
                     setCategories([...updatedCategory]);
                        
                     }
                }
                />

        <AiOutlineDelete className='text-[18px] cursor-pointer'
                                
        onClick={() => {
                        
            setCategories(categories?.filter((c: any, i: number) => {
                
                if (i !== index) {
                    return true;
                } else {
                    return false;                     
                }

            }))
        
        } }                            
                                
        />
        </div>

        ))}                 
        </div> 
                    
         ):""}       
       
        <AiOutlinePlusCircle className ='text-[20px] mt-10 hover:cursor-pointer' onClick={handleAddCategory} />       

        </div>
        </div>

           <div className='flex justify-end'>
                <div
                            className={`w-[120px] flex items-center justify-center h-[40px] ${!areCategoriesUnchanged(data?.layout?.categories, categories)?"bg-[#37a39a] !cursor-not-allowed" :"bg-gray-300 cursor-pointer"}text-center text-[#fff] rounded  m-[20px] `}
                    onClick={
                        
                        async () => {
                    
                            if (!areCategoriesUnchanged(data?.layout?.categories, categories)) {
                                
                              await editCategories({ type: "Categories", categories });

                            }
                           
                            



                    }}
        >
          Save
        </div>  
        </div> 
        </div>
  
            ) : <>
            
                    <Loader/>
            
            </>}    
            

</>
            
            )
}

export default EditCategories