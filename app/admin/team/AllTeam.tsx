"use client"

import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Link from "next/link";
import { FiEdit2 } from "react-icons/fi";
import { styles } from "../../styles/styles";
import Loader from "../../components/Loader/Loader";
import { useDeleteCourseMutation, useGetAllCoursesQuery } from "../../../redux/features/courseApi";
import { format } from "timeago.js";
import toast from "react-hot-toast";
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateRoleMutation } from "../../../redux/features/UserApi/userApi";



type Props = {}

const AllTeam = (props: Props) => {
 
    const [role,setRole] = useState("")
    const [active, setActive] = useState(false);
    const [email,setEmail]=useState("")
   const [userId,setUserId] =useState(null)   
    const [open, setOpen] = useState(false);   
    const { data,isLoading } = useGetAllUsersQuery({});
    const [deleteUser] = useDeleteUserMutation();
    const [updateRole,{ error,isError,isSuccess }] = useUpdateRoleMutation();
    
    const updateRoleHandler = async() => {
        
        await updateRole({ email, role });
        setActive(!active);
    };


 useEffect(() => {
            
            if (isSuccess) {
              
             toast.success("Role Updated Successfully!");       
    
            } else if (isError) {
                
                const errorMessage = error as any;
                toast.error(errorMessage?.data?.message)
    
            }
           
    
        },[isSuccess,isError])



    const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    { field: "name", headerName: "Name", flex: 0.3 },
    { field: "email", headerName: "Email", flex: 0.3 },
    { field: "role", headerName: "Role", flex: 0.2 },
    { field: "courses", headerName: "Courses Purchased", flex: 0.2 },
    { field: "joinedAt", headerName: "joined At", flex: 0.3 },

      {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
            onClick={() => {
                  
                 setOpen(!open);
                 setUserId(params.row.id);      
                
              }}
            >
              <AiOutlineDelete className="text-white" size={20} />
            </Button>
          </>
        );
      },
        },
      
      { 
      field: "  ",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
            onClick={() => {
                  
               
                
              }}
                >
            <a href={`mailto:${params.row.email}`}>     
            <AiOutlineMail className="text-white" size={20} />   
            </a>   
            </Button>
          </>
        );
      },
    },
    
    ];

    
    const deleteUserHandler = async () => {
            
            await deleteUser(userId);
            setUserId(null)
            setOpen(!open);
        
    };    



  const rows: any = [];
  if (data) {
     const validTeamMember=data?.AllUsers?.filter((e:any)=>(e?.role ==="admin"))
      
      
      validTeamMember?.forEach((user: any) => {
     
        rows.push({

        id: user?._id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        courses: user?.courses?.length,
        joinedAt:format(user?.createdAt)

      });
    
    });
  }

  

  return (
    <>
          {isLoading ? (
              <Loader />
          ) : (
              <div className="">
            <Box m="20px">
              <div className="w-full flex justify-end">
              <div
                className={`${styles.button} !w-[220px] bg-[#57c7a3]! !h-[35px] border-[#ffffffa8]`}
                onClick={() => setActive(!active)}
              >
                Add New Member
              </div>
            </div>

                      <Box
                          m="40px 0 0 0"
                          height="80vh"
                          sx={{
                              "& .MuiDataGrid-root": {
                                  border: "none",
                                  outline: "none",
                                  backgroundColor: "#1B2437",
                              },

                              "& .MuiDataGrid-sortIcon": {
                                  color: "#fff",
                              },

                              /* ROWS */
                              "& .MuiDataGrid-row": {
                                  color: "#fff",
                                  backgroundColor: "#1B2437",
                                  "&:hover": {
                                      backgroundColor: "#252644",
                                  },
                              },

                              "& .MuiTablePagination-root": {
                                  color: "#fff",
                              },

                              "& .MuiDataGrid-cell": {
                                  borderBottom: "none",
                                  color: "#fff",
                              },

                              /* ================= HEADER FIX ================= */

                              /* Header container */
                              "& .MuiDataGrid-columnHeaders": {
                                  backgroundColor: "#363E89",
                                  borderBottom: "none",
                              },

                              /* EACH header cell (MAIN FIX) */
                              "& .MuiDataGrid-columnHeader": {
                                  backgroundColor: "#363E89",
                                  color: "#fff",
                                  "&:focus, &:focus-within": {
                                      outline: "none",
                                  },
                              },

                              /* Header title text */
                              "& .MuiDataGrid-columnHeaderTitle": {
                                  color: "#fff",
    
                              },

                              /* Checkbox header */
                              "& .MuiDataGrid-columnHeaderCheckbox": {
                                  backgroundColor: "#363E89",
                              },

                              /* Column divider */
                              "& .MuiDataGrid-columnSeparator": {
                                  color: "#1B2437",
                              },

                              /* ================================================= */

                              "& .MuiDataGrid-virtualScroller": {
                                  backgroundColor: "#1a1b2e",
                              },

                              "& .MuiDataGrid-footerContainer": {
                                  color: "#fff",
                                  borderTop: "none",
                                  backgroundColor: "#363E89",
                              },

                              "& .MuiDataGrid-toolbar": {
                                  backgroundColor: "##1B2437",
                                  color: "#fff",
                              },

                              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                  color: "#fff",
                              },

                              "& .MuiDataGrid-menuIcon": {
                                  color: "#fff",
                              },

                              "& .MuiDataGrid-iconButtonContainer": {
                                  color: "#fff",
                              },
                              "& .MuiDataGrid-overlay": {
                                  backgroundColor: "#1B2437",
                                  color: "#fff",          // text color (optional)
                                  fontSize: "16px",
                              },
                          }}
                      >

                          <DataGrid
                              checkboxSelection
                              rows={rows}
                              columns={columns}
                              sx={{
                                  backgroundColor: "#1B2437",
                                  color: "#fff",
                                  border: "1px solid rgba(255,255,255,0.1)",

                                  /* ===== HEADER (MOST IMPORTANT) ===== */
                                  "& .MuiDataGrid-columnHeaders": {
                                      backgroundColor: "#363E89 !important",
                                  },

                                  "& .MuiDataGrid-columnHeader": {
                                      backgroundColor: "#363E89 !important",
                                      color: "#fff !important",
                                  },

                                  "& .MuiDataGrid-columnHeaderTitle": {
                                      color: "#fff !important",
                                      fontWeight: 600,
                                  },

                                  "& .MuiDataGrid-columnHeaderCheckbox": {
                                      backgroundColor: "#363E89 !important",
                                  },

                                  "& .MuiDataGrid-columnSeparator": {
                                      color: "#1B2437",
                                  },

                                  /* ===== ROWS ===== */
                                  "& .MuiDataGrid-row": {
                                      backgroundColor: "#1B2437",
                                      color: "#fff",
                                      "&:hover": {
                                          backgroundColor: "#252644",
                                      },
                                  },

                                  "& .MuiDataGrid-cell": {
                                      borderBottom: "none",
                                      color: "#fff",
                                  },

                                  /* ===== FOOTER ===== */
                                  "& .MuiDataGrid-footerContainer": {
                                      backgroundColor: "#363E89",
                                      color: "#fff",
                                      borderTop: "none",
                                  },

                                  /* ===== NO ROWS ===== */
                                  "& .MuiDataGrid-overlay": {
                                      backgroundColor: "#1B2437",
                                      color: "#fff",
                                  },
                              }}
                          />
                      </Box>

                       <Modal
                              open={open}
                              onClose={() => setOpen(!open)} 
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                          >
                              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                                  <h1 className={`${styles.title}`}>
                                      Are you sure you want to delete this User?
                                  </h1>
                                  <div className="flex w-full items-center justify-between mb-6 mt-4">
                                      <div
                                          className={`${styles.button} !w-[120px] h-[30px] bg-[#47d097]`}
                                         onClick={() => setOpen(!open)}
                                      >
                                          Cancel
                                      </div>
                                      <div
                                          className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f3f]`}
                                        onClick={deleteUserHandler}
                                      >
                                          Delete
                                      </div>
                                  </div>
                              </Box>
                          </Modal>
                          
                          
                              
 <Modal
                              open={active}
                              onClose={() => setActive(!active)} 
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                          >
                              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                                
                                  <div className="w-full">
                                      <div className="flex justify-center" >Add New Member</div>
                                      <div>
                                      
                                      <input
            type="name"
            name=""
            required
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            id="name"
            placeholder="Enter Email..."
            className="w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
          />
                                      
           <select
    className="w-full rounded-lg border border-gray-300 mt-2 bg-gray-400 px-4 py-2 text-sm
           focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
  
        value={role}
        onChange={(e) => setRole(e.target.value)}                                
        >
    <option value="">Select role</option>
    <option value="user">User</option>
    <option value="admin">Admin</option>
  </select>                           
                                      
                                          <div className="flex justify-center mt-3">
                            <div
                className={`rounded flex justify-center items-center !w-[220px] bg-[#57c7a3]! !h-[35px] border-[#ffffffa8]`}
                onClick={updateRoleHandler}
              >
                Update Role
              </div>              
                                          
                                          </div>                             
                                      </div>  


                                  </div>
                              </Box>
                          </Modal>

                  </Box> 
               </div> 
  )}
      </> 




  )
}

export default AllTeam