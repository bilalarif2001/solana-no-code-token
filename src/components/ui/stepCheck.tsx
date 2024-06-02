import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
function StepCheck({ status }) {
  // const {active,pending, done} = status;
  const progressValue= status.active==1? 0 : status.active==2? 50 : status.active==3? 100 : 0
  return (
    <div className={`relative my-16 mx-12 rounded-full z-20`}>
      <Progress className="h-[2px]" value={progressValue} />

      <div className="absolute -top-[5px]">
        <div className={` absolute  border ${status.active==1 || status.completed>=1? "border-cyan-500 bg-cyan-900": "border-zinc-500 bg-zinc-900"} p-[5px] rounded-full  z-20 transition duration-300`} />
        <div className={` ${status.active==1 && "animate-ping"} absolute bg-cyan-600 -left-[0.3px] rounded-full z-10 p-[6px]`}></div>
        <p className={` absolute top-[20px] -left-6  text-[10px] tracking-wide font-semibold w-14 text-center ${status.active==1 || status.completed>=1 ? "text-zinc-200": "text-zinc-700"} transition duration-300`}>
          Uploading Metadata
        </p>
      </div>

      <div className="absolute -top-[5px] left-28 sm:left-44">
        <div className={` absolute  border ${status.active==2 || status.completed>=2? "border-cyan-500 bg-cyan-900": "border-zinc-500 bg-zinc-900"} p-[5px] rounded-full  z-20 transition duration-300`} />
        <div className={` ${status.active==2 && "animate-ping"} absolute   bg-cyan-600 -left-[0.3px] rounded-full z-10 p-[6px]`}></div>
        <p className={` absolute top-[20px] -left-6  text-[10px] tracking-wide font-semibold w-14 text-center ${status.active==2 || status.completed>=2 ? "text-zinc-200": "text-zinc-700"} transition duration-300`}>
          Creating Token
        </p>
      </div>

      <div className="absolute -top-[5px] left-56 sm:left-[360px]">
        <div className={` absolute  border ${status.active==3 || status.completed>1? "border-cyan-500 bg-cyan-900": "border-zinc-500 bg-zinc-900"} p-[5px] rounded-full  z-20 transition duration-300`} />
        <div className={` ${status.active==3 && "animate-ping"} absolute   bg-cyan-600 -left-[0.3px] rounded-full z-10 p-[6px]`}></div>
        <p className={` absolute top-[20px] -left-6  text-[10px] tracking-wide font-semibold w-14 text-center ${status.active==3 || status.completed==3 ? "text-zinc-200": "text-zinc-700"} transition duration-300`}>
          Transaction Details
        </p>
      </div>
      
    </div>
  );
}

export default StepCheck;
