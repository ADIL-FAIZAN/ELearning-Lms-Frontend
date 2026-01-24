"use client"
import { Josefin_Sans, Poppins, Cedarville_Cursive } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";
import 'react-pro-sidebar/dist/css/styles.css';
import socketIO from "socket.io-client";
import { useEffect } from "react";
const EndPoint = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "";
const socketId = socketIO(EndPoint,{transports: ["websocket"]});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});
const cursive = Cedarville_Cursive({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-Cursive",
});

export default function RootLayout({ children }:{ children: React.ReactNode }) {
    
  
  return (
     
    <html lang="en">
    <body className={`${poppins.variable} ${josefin.variable} ${cursive.variable} bg-gray-900! text-white! bg-no-repeat`}>     
        
    <Provider>
    <SessionProvider>
    <Custom children={children} />
            
    <Toaster position="top-center" reverseOrder={false} />  
    </SessionProvider>
    </Provider> 
    
    </body>
    </html>
  
  );
}
 
interface child{

children:React.ReactNode

}

const Custom = ({ children }: child) => {
  
  const { isLoading } = useLoadUserQuery();

  
  useEffect(() => {
    
    socketId.on("connection", () => { });

  }, []);
  
  
  
  return (
    <>
      {isLoading ? <Loader /> : <>{children}</>}
    </>
  )

};
