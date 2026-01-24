import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { styles } from "../../../styles/styles";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import toast from "react-hot-toast";
import { useDeleteUserMutation, useGetAllUsersQuery } from "../../../../redux/features/UserApi/userApi";


type Props = {}

const Allusers = (props: Props) => {

    const [userId,setUserId] =useState(null)   
    const [open, setOpen] = useState(false);   
    const { data,isLoading } = useGetAllUsersQuery({});
    const [deleteUser, { error,isError,isSuccess }] = useDeleteUserMutation();
    
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
    data?.AllUsers?.forEach((user: any) => {
     
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

    
        useEffect(() => {
            
            if (isSuccess) {
              
             toast.success("User deleted successfully!");       
    
            } else if (isError) {
                
                const errorMessage = error as any;
                toast.error(errorMessage?.data?.message)
    
            }
           
    
        },[isSuccess,isError])

  

  return (
      <>
          
          {isLoading ? (
              <Loader />
          ) : (
              <div className="">
                  <Box m="20px">
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
                          
                  </Box> 
               </div> 
  )}
      </> 
  )
}


export default Allusers;