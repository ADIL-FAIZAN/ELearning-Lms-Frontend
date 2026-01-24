"use client"

import { useGetAllCoursesQuery } from '../../../redux/features/courseApi';
import { useGetAllOrdersQuery } from '../../../redux/features/orderApi';
import { useGetAllUsersQuery } from '../../../redux/features/UserApi/userApi';
import React, { useEffect, useState } from 'react'
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { format } from 'timeago.js';
import Loader from '../Loader/Loader';
import { AiOutlineMail } from 'react-icons/ai';
import AdminDashboardHeader from './AdminDashboardHeader';


type Props = {

isDashboard:boolean

}

const AllInvoices = ({isDashboard}: Props) => {

  const [ordersData, setOrdersData] = useState([]);
  const {data:coursesData,isLoading: coursesLoading} =  useGetAllCoursesQuery({});
  const {data:orderData,isLoading: ordersLoading} = useGetAllOrdersQuery({});
  const {data:usersData,isLoading: usersLoading} = useGetAllUsersQuery({});

  const isLoading = coursesLoading || ordersLoading || usersLoading;


  useEffect(() => {

  if (!orderData || !coursesData || !usersData) return;

  const temp = orderData?.AllOrders?.map((order: any) => {
  const user = usersData?.AllUsers?.find((user:any)=>(user._id === order.userId));
  const course = coursesData?.AllCourses?.find((course:any)=>(course?._id === order?.courseId));
 
     return {
    
       ...order,
       userName: user?.name,
       userEmail: user?.email,
       title: course?.name,
       price: `$`+course?.price

     };
 
  });

     setOrdersData(temp);  
        

  },[orderData,coursesData,usersData]);

 
 const columns: any = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
          { field: "userEmail", headerName: "Email", flex: 1 },
          { field: "title", headerName: "Course Title", flex: 1 },
        ]),
    { field: "price", headerName: "Price", flex: 0.5 },
    ...(isDashboard
      ? [{ field: "formattedDate", headerName: "Created At", flex: 0.5 }]
      : [
          {
            field: " ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => (
              <a href={`mailto:${params.row.userEmail}`}>
                <AiOutlineMail
                  className="text-white"
                  size={20}
                />
              </a>
            ),
          },
        ]),
  ];
  const rows = ordersData?.map((item: any) => ({
    id: item._id,
    userName: item.userName,
    userEmail: item.userEmail,
    title: item.title,
    price: item.price,
    formattedDate: format(item.createdAt),
  }));
  return (

    <>
    
  
    
    <div className={!isDashboard ? "mt-[30px]" : "mt-[0px]"}>

      {isLoading ? (
        <Loader />
      ) : (
        <Box m={isDashboard ? "0" : "40px"}>
          <Box
            m={isDashboard ? "0" : "40px 0 0 0"}
            height={isDashboard ? "42vh" : "82.49vh"}
            overflow={"hidden"}
            sx={{
              "& .MuiDataGrid-root": { border: "none", outline: "none",backgroundColor: "#1B2437" },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color:  "1B2437",
              },
              "& .MuiDataGrid-sortIcon": {
                color:  "#fff",
              },
              "& .MuiDataGrid-row": {
                color:  "#fff",
                borderBottom:"1px solid #ffffff30!important"
                   
              },
              "& .MuiTablePagination-root": {
                color:"#fff",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none !important",
              },
              "& .name-column--cell": {
                color:"#fff",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor:"#3e4396",
                borderBottom: "none",
                color: "#000",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor:"#1F2A40",
              },
              "& .MuiDataGrid-footerContainer": {
                color: "#fff",
                borderTop: "none",
                backgroundColor:"#3e4396",
              },
              "& .MuiCheckbox-root": {
                color:`#b7ebde !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: "#fff !important", // Fixed toolbar color
              },
            }}
          >
            <DataGrid
              checkboxSelection={!isDashboard}
              rows={rows}
              columns={columns}
              slots={isDashboard ? {} : { toolbar: GridToolbar }}
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
        </Box>
      )}
    </div>
  
  </>
    )

}

export default AllInvoices