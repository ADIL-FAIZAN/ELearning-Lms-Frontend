import axios from 'axios';
import MainProfileComponent from './MainProfileComponent';
import { Metadata } from "next";
import { cookies } from "next/headers";

type Props = {}

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}user/get-user-by-id`,
      {
        headers: {
          Cookie: cookieStore.toString(), // ✅ pass cookies manually
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return {
        title: "Profile | ELearning",
        description: "User profile page",
      };
    }

    const data = await res.json();
    const user = data.User;

    return {
      title: `${user.name} profile`,
      description: `Profile of ${user.name}`,
    };
  } catch (err) {
    return {
      title: "Profile | ELearning",
      description: "User profile page",
    };
  }
}


const page = (props: Props) => {


  return (
 <>
<MainProfileComponent/>       
  </>    
    
  )
}

export default page;