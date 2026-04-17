import { useLoadUserQuery } from '../../redux/features/api/apiSlice';
import { useCreateOrderMutation } from '../../redux/features/orderApi';
import { LinkAuthenticationElement,PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import socketIO from "socket.io-client";
import Loader from './Loader/Loader';
const EndPoint = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "";
const socketId = socketIO(EndPoint,{transports: ["websocket"]});

type Props = {

  courseData: any,
  refetchSingleCourse:any

}

const CheckoutForm = ({courseData,refetchSingleCourse}: Props) => {

    const [CreateOrder, { isLoading: createOrderLoading, data: createOrderResponseData, error,isSuccess:createOrderSuccessfully }] = useCreateOrderMutation();
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<any>("");
    const [loadUser, setLoadUser] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {refetch:userRefetch,data:userData} = useLoadUserQuery(undefined,{});
    const router = useRouter();


    const handleSubmit = async (e:any) => {
    e.preventDefault();
        
    if (!stripe || !elements) {        
    return;    
    };

        setIsLoading(true);
        
        const { error, paymentIntent } = await stripe.confirmPayment({
       
        elements,
        redirect:"if_required"    

        });


        if (error) {
            
            setMessage(error.message);
            setIsLoading(false);

        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            
            setIsLoading(false);
            CreateOrder({ courseId: courseData?.course?._id, payment_info: paymentIntent });

        };
 };

    
    const handleRefetch = async () => {
   
    try {
    const result = await userRefetch();
    await refetchSingleCourse();
    router.push(`/course-access/${courseData?.course?._id}`);
      
  } catch (err) {
    
  console.error("Refetch failed:", err);
  
  }
      
};
    
    
    useEffect(() => {
    
        if (createOrderSuccessfully) {
        
        handleRefetch();  
        
        socketId.emit("notification", {
          
        title:"New Order",  
        userId:userData?._id,  
        message:`You have a new Order from ${courseData?.course?.name}`

        })
           
      };
    
        if (error) {
        
         const errorMessage = error as any;
         toast.error(errorMessage.data.message);
        
        };

    }, [createOrderSuccessfully, error]);
    


  return (
    <>
    {isLoading ? <Loader/>
    :
    
   <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
      id="link-authentication-element"

      />
      <PaymentElement id="payment-element" />
              
      <button disabled={isLoading || !stripe || !elements}  id="submit">
      <span id="button-text" className={`flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer bg-[#2190ff] min-h-[45px] w-full text-[16px] font-Poppins font-semibold mt-2 !h-[35px]`}>
      {isLoading ? "Paying..." : "Pay Now"}
      </span>
      </button>

      {message && (
        <div id="payment-message" className="text-[red] font-Poppins pt-2">
          {message}
        </div> 
      )}
              
     </form>
          
      }
</>  
  )
}

export default CheckoutForm