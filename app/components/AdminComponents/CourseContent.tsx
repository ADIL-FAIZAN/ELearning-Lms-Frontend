import { Elsie_Swash_Caps } from "next/font/google";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
  activeItem: number;
  setActiveItem: (value: any) => void;
  courseContentData: any;
  setCourseContentData: (value: any) => void;
  handleCourseSubmit: any;
};

const CourseContent = ({activeItem,setActiveItem,courseContentData,setCourseContentData,handleCourseSubmit}: Props) => {
  
  const [isCollapsed, setIsCollapsed] = useState( Array(courseContentData.length).fill(false)); 
  const [activeSection, setActiveSection] = useState(1);

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  // Removes a link
  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      let newVideoSection = "";

      if (courseContentData.length > 0) {
        const lastVideoSection = courseContentData[courseContentData.length - 1].videoSection;

        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      };

      const CourseContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoLength: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
        suggestion: "",
      };

      setCourseContentData([...courseContentData, CourseContent]);
    } // else logic closed
  };

  const addNewSection = () => {
    
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
   
      toast.error("Please fill all the fields first!");
   
    } else {

      setActiveSection(activeSection + 1);
      
      const CourseContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoLength: "",
        videoSection: `${activeSection+1}.Untitled Section`,
        links: [{ title: "", url: "" }],
        suggestion: "",
      };

      setCourseContentData([...courseContentData, CourseContent]);
    }
  };

  const prevHandler = () => {
  setActiveItem(activeItem - 1);
  };


  const updateSectionName = (oldSectionName: string, currentValue: string) => { 
 
    
            
    const updatedArray = [...courseContentData];
        
    for(let i = 0; i < updatedArray.length; i++) {
      
          
    if (updatedArray[i].videoSection === oldSectionName) {
         
        updatedArray[i].videoSection = currentValue;
      
        };      
    };
    
   if (currentValue.length >= 0) { 
    
   setCourseContentData(updatedArray);

    };       
        
  };
  


  return (
    <div className="px-0">
      <form onSubmit={handleCourseSubmit}>
        {/* Course name input */}
        <div>
          {courseContentData?.map((e: any, index: number) => {
            const showSectionInput = index === 0 || e.videoSection !== courseContentData[index - 1].videoSection;

            return (
              <>
                <div
                  className={`w-full bg-[#cdc8c817] pt-5  pb-10 px-3 ${
                    showSectionInput ? "mt-10" : "mb-0"
                  }`}
                >
                  {showSectionInput && (
                    <>
                      <div className="flex gap-0 w-full items-center">
                        <div className="font-bold">
                          <input
                            className={`text-[20px] ${
                              e.videoSection === "Untitled Section"
                                ? "w-[170px]"
                                : "w-full"
                            } font-Poppins cursor-pointer text-white outline-none`}
                            type="text"
                            onChange={(c:any) => { updateSectionName(e?.videoSection,c.target.value)}}
                            value={`${e?.videoSection}`}
                          />
                        </div>

                        <div>
                          <BsPencil className="cursor-pointer text-white" />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex w-full items-center justify-between my-0">
                    {isCollapsed[index] ? (
                      <>
                        {e?.title ? (
                          <p className="font-poppins text-white ">
                            {index + 1}.{e?.title}
                          </p>
                        ) : (
                          ""
                        )}{" "}
                        {/* Title Closed here */}
                      </>
                    ) : (
                      ""
                    )}{" "}
                    {/* isCollapsed Closed here */}
                    {/* Arrow Button For Collapsed video content */}
                    <div className="flex w-full justify-end">
                    <div className="flex mt-3">
                      <AiOutlineDelete className={`text-white text-[20px] mr-2 ${ index > 0 ? "cursor-pointer" : "cursor-no-drop"}`}
                        
                          onClick={() => {
                           
                            if (index > 0) {
                              const updatedData = [...courseContentData];
                              updatedData.splice(index, 1);
                              setCourseContentData(updatedData);
                            }
                          }}
                        />

                        <MdOutlineKeyboardArrowDown
                          fontSize="large"
                          className="text-white"
                          style={{
                            transform: isCollapsed[index]
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                          }}
                          onClick={() => handleCollapseToggle(index)}
                        />
                      </div>
                    </div>
                  </div>

                  {!isCollapsed[index] && (
                    <>
                      <div className="pb-8">
                        <label className="text-[16px] font-Poppins text-white">
                          Video Title
                        </label>
                        <input
                          type="name"
                          name=""
                          required
                          value={e?.title}
                          onChange={(e: any) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].title = e.target.value;
                            setCourseContentData(updatedData);
                          }}
                          id="name"
                          placeholder="Enter Your Video Title Here..."
                          className="w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
                        />
                      </div>

                      <div className="pb-8">
                        <label className="text-[16px] font-Poppins text-white">
                          Video Url
                        </label>
                        <input
                          type="name"
                          name=""
                          required
                          value={e?.videoUrl}
                          onChange={(e: any) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].videoUrl = e.target.value;
                            setCourseContentData(updatedData);
                          }}
                          id="name"
                          placeholder="Enter Your Video Url Here.."
                          className="w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
                        />
                      </div>

                      <div className="pb-8">
                        <label className="text-[16px] font-Poppins text-white">
                        Video Length (in minutes)
                        </label>
                        <input
                          type="name"
                          name=""
                          required
                          value={e?.videoLength}
                          onChange={(e: any) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].videoLength = e.target.value;
                            setCourseContentData(updatedData);
                          }}
                          id="name"
                          placeholder="Enter Your Video Length Here.."
                          className="w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
                        />
                      </div>

                      <div className="mb-5">
                        <label className="text-[16px] font-Poppins text-white">
                          Video Description
                        </label>
                        <textarea
                          name=""
                          id=""
                          cols={30}
                          rows={8}
                          placeholder="Write something amazing..."
                          className="w-full text-white bg-transparent border rounded h-[150px] pt-1 px-2 outline-none mt-[10px] font-Poppins"
                          value={e?.description}
                          onChange={(e: any) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].description = e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />
                        <br />
                        <br />
                      </div>

                      {e?.links?.map((e: any, linkIndex: any) => (
                        <div className="pb-8">
                          <div className="flex justify-between">
                            <label className="text-[16px] font-Poppins text-white">
                              Link {linkIndex + 1}
                            </label>
                            <AiOutlineDelete
                              className={`${
                                linkIndex === 0
                                  ? "cursor-no-drop"
                                  : "cursor-pointer"
                              } text-white text-[20px]`}
                              onClick={() =>
                                linkIndex === 0
                                  ? null
                                  : handleRemoveLink(index, linkIndex)
                              }
                            />
                          </div>

                          <input
                            type="name"
                            name=""
                            required
                            value={e?.title}
                            onChange={(e: any) => {
                              const updatedData = [...courseContentData];
                              updatedData[index].links[linkIndex].title =
                                e.target.value;
                              setCourseContentData(updatedData);
                            }}
                            id="name"
                            placeholder="Enter Your Link Title Here..."
                            className="w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
                          />

                          <input
                            type="name"
                            name=""
                            required
                            value={e?.url}
                            onChange={(e: any) => {
                              const updatedData = [...courseContentData];
                              updatedData[index].links[linkIndex].url =
                                e.target.value;
                              setCourseContentData(updatedData);
                            }}
                            id="name"
                            placeholder="Enter Your Link Url Here..."
                            className="w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
                          />
                        </div>
                      ))}

                      <div
                        className="cursor-pointer flex gap-2 items-center"
                        onClick={() => handleAddLink(index)}
                      >
                        Add new Link{" "}
                        <BsLink45Deg className="mr-2 text-[18px]" />
                      </div>
                    </>
                  )}

                  <br />

                  {/* Add new content */}

                  {index === courseContentData.length - 1 && (
                    <div>
                      <p
                        className="flex items-center text-[18px] text-white cursor-pointer"
                        onClick={() => newContentHandler(e)}
                      >
                        <AiOutlinePlusCircle className="mr-2" />
                        Add New Content
                      </p>
                    </div>
                  )}
                </div>
              </>
            );
          })}{" "}
          {/* Course Content Data Main Div End Here */}
          <br />
          <div
            onClick={addNewSection}
            className="flex items-center text-[20px] text-white cursor-pointer"
          >
          <AiOutlinePlusCircle /> Add New Section
        </div>
        </div>
        <br />

        <div className="w-full flex justify-between">
          <div
            className="w-[150px] flex justify-center items-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded cursor-pointer"
            onClick={prevHandler}
          >
            Prev
          </div>

          <div>
            <input
              type="submit"
              value="Next"
              className="w-[150px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded cursor-pointer"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CourseContent;
