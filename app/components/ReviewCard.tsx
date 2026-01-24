import Image from 'next/image';
import React, { FC } from 'react'
import Ratings from '../utils/Ratings';

type ReviewItem = {
  avatar: string;
  name: string;
  Profession: string;
  rating: number;
  comment: string;
};

type Props = {
  item: ReviewItem;
};




const ReviewCard: FC<Props> = ({ item }) => {


  return (
        
    <div className="w-full h-max pb-4 bg-gray-800 bg-opacity-[0.20] border border-[#00000028] backdrop-blur shadow-[bg-slate-700] rounded-lg p-3 shadow-inner">
      <div className="flex w-full">
              
          <Image
                  
          src={item?.avatar}
          height={50}
          width={50}
          className="w-[50px] h-[50px] rounded-full object-cover"
          alt="card-pic"
        />
        <div className="md:flex justify-between w-full hidden">
          <div className="pl-4">
            <h5 className="text-[20px] text-white">
              {item.name}
            </h5>
            <h6 className="text-[16px] text-[#ffffab]">
              {item.Profession}
            </h6>
          </div>
          <Ratings rating={item.rating} />
        </div>
        {/* Mobile Responsive */}
        <div className="md:hidden justify-between w-full flex flex-col">
          <div className="pl-4">
            <h5 className="text-[20px] text-white">
              {item.name}
            </h5>
            <h6 className="text-[16px] text-white">
              {item.Profession}
            </h6>
          </div>
          <Ratings rating={item.rating} />
        </div>
      </div>
      <p className="pt-2 px-2 font-Poppins text-white">
        {item.comment}
      </p>
    </div>
   
  )
}

export default ReviewCard