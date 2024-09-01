import React from "react";
import { useNavigate } from "react-router-dom";
export default function Donate({ bookIllus }) {
  const navigate = useNavigate();
  return (
    <div className="wrapper2  justify-between pr-10 flex-row bg-purple-200 flex h-40 items-center overflow-hidden">
      <div className="imgwrapper w-1/2 flex">
        <img
          className="w-full imgdonate rounded-full -translate-x-12"
          
          src="https://images.pexels.com/photos/8926546/pexels-photo-8926546.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="err"
        />
      </div>
      <div className="donate w-2/3 break-words whitespace-normal flex-wrap h-20 flex flex-col justify-center items-end">
        <h5 className="py-1 text-center">
          Spread Education and Help a Needy child
        </h5>
        <button
          onClick={() => navigate("/contact")}
          className="btn px-2 py-1 items-center flex rounded-full donatenow text-white bg-purple-500"
        >
          Donate Now
        </button>
      </div>
    </div>
  );
}
