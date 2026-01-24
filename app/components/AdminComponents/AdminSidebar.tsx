"use client";

import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { GrPrevious } from "react-icons/gr";
import Image from "next/image";
import { 
  AiOutlineHome,           // Dashboard
  AiOutlineUser,           // Users
  AiOutlineFileText,       // Invoices
  AiOutlineBarChart,       // Courses Analytics
  AiOutlineVideoCamera,    // Live Courses
  AiOutlineTeam,           // Manage Team
  AiOutlineQuestionCircle, // FAQ
  AiOutlineSetting,        // Settings (if needed)
  AiOutlineLogout          // Exit (if needed)
} from "react-icons/ai";
import { MdVideoCall, MdWeb, MdCategory } from "react-icons/md";
import { Box, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { useLogoutQuery } from "../../../redux/features/auth/authApi"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { signOut } from "next-auth/react";
import React, { FC } from "react";



interface itemProps {
  title: string;
  to: string;
  icon: React.ReactElement;
  selected: string;
  setSelected: any;
}
// A reusable sidebar link component
const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className="text-[16px] font-Poppins">{title}</Typography>
      <Link href={to} />
    </MenuItem>
  );
};


const AdminSidebar = () => {

const { user } = useSelector((state: any) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const [logout, setLogout] = useState(false);

  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const logoutHandler = async () => {
    setLogout(true);
    await signOut({ redirect: false });
    window.location.href = "/";
  };

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }




  return (
<div className="mr-[20px]">
<Box 
  sx={{
    "& .pro-sidebar-inner": {
      background: "#111C43 !important", // dark background
      overflowY: "auto",                 // vertical scroll
      scrollbarWidth: "thin",            // Firefox
      scrollbarColor: "#6870fa #111C43", // thumb & track for Firefox

      // Chrome, Edge, Safari
      "&::-webkit-scrollbar": {
        width: "6px",
      },
      "&::-webkit-scrollbar-track": {
        background: "#111C43",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#6870fa",
        borderRadius: "3px",
        border: "1px solid #111C43",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#868dfb",
      },
    },
    "& .pro-icon-wrapper": {
      backgroundColor: "transparent !important",
    },
    "& .pro-inner-item:hover": {
      color: "#868dfb !important",
    },
    "& .pro-menu-item.active": {
      color: "#6870fa !important",
    },
    "& .pro-inner-item": {
      padding: "5px 35px 5px 20px !important",
      opacity: 1,
    },
    "& .pro-menu-item": {
      color: "#fff",
    },
  }}
  className="bg-[#111C43]"
>
      <ProSidebar
        collapsed={isCollapsed}
        collapsedWidth="60px"   // yahan control karo
        width="240px" 
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 99999999999999,
          width: isCollapsed ? "0vh" : "30vh",
        }}
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ?  <GrPrevious  /> : undefined}
            style={{
              margin: "10px 0 20px 0",
            }}
          >
            {!isCollapsed && (
    <Box display="flex" justifyContent="space-between" alignItems="center" ml="10px">
      {/* Logo (Link) */}
      <Link href="/" className="block">
        <h3 className="text-[18px] font-Poppins uppercase text-white">
          ELearning
        </h3>
      </Link>

      {/* Collapse Icon */}
      <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
      <GrPrevious className="inline-block text-white"/>
      </IconButton>
      </Box>
      )}
      </MenuItem>
        
          {!isCollapsed && (
            <Box mb="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
            {/* 🔹 Profile */}
          
              <Image
                src="/assests/avatardefault.jpg"
                width={80}
                height={80}
                alt="Admin Avatar"
                className="rounded-full"
              />
         
              </Box>

              
              <Box textAlign="center">
                <Typography
                  variant="h6"
                  className="text-[10px] text-[#ffffffc1]"
                  sx={{ m: "10px 0 0 0" }}
                >
                    {user?.name}
              
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ m: "10px 0 0 0" }}
                  className="text-[10px] text-[#ffffffc1] capitalize"
                >
                  -Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "8%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<AiOutlineHome />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              sx={{ m: "10px 0 5px 25px" }}
              className="text-[18px] text-[#ffffffc1] "
            >
              {!isCollapsed && "Data"}
            </Typography>
            <Item
              title="Users"
              to="/admin/users"
              icon={<AiOutlineTeam />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Invoices"
              to="/admin/invoices"
              icon={<AiOutlineFileText />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              className="text-[10px] text-[#ffffffc1]  "
              sx={{ m: "18px 0 5px 20px" }}
            >
              {!isCollapsed && "Content"}
            </Typography>
            <Item
              title="Create Course"
              to="/admin/create-course"
              icon={<MdVideoCall />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Live Courses"
              to="/admin/courses"
              icon={<AiOutlineVideoCamera />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              className="text-[10px] text-[#ffffffc1] "
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Customization"}
            </Typography>
            <Item
              title="Hero"
              to="/admin/edit-hero"
              icon={<MdWeb  />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ"
              to="/admin/faq"
              icon={<AiOutlineQuestionCircle />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Categories"
              to="/admin/categories"
              icon={<MdCategory />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              className="text-[18px] text-[#ffffffc1] capitalize "
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Controllers"}
            </Typography>
            <Item
              title="Manage Team"
              to="/admin/team"
              icon={<AiOutlineUser  />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              className="text-[18px] text-[#ffffffc1] capitalize"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Analytics"}
            </Typography>
            <Item
              title="Courses Analytics"
              to="/admin/courses-analytics"
              icon={<AiOutlineBarChart />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Orders Analytics"
              to="/admin/orders-analytics"
              icon={<AiOutlineUser  />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Users Analytics"
              to="/admin/users-analytics"
              icon={<AiOutlineUser  />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              className="text-[18px] text-[#ffffffc1] capitalize"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Extras"}
            </Typography>
            <div >
              <Item
                title="Logout"
                to="/"
                 icon={<AiOutlineLogout />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
    </div>  


      );
};

export default AdminSidebar;
