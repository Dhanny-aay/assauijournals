import React from "react";
import { useGeneral } from "../contexts/generalContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import mission from "../image/mission.png";
import vision from "../image/vision.png";
import wwd from "../image/wwd.png";

const About = () => {
  const { generalInfo, loading: generalLoading } = useGeneral();

  return (
    <div className="w-full px-5 md:px-10 lg:px-20 pb-20 flex flex-col">
      <div className="w-full">
        <p className="font-Ubuntu font-medium text-2xl text-center md:text-3xl text-[#121212]">
          About us
        </p>
        <div className="flex flex-col w-full mt-10 space-y-8 md:space-y-10">
          {/* About Section */}
          <div className="flex flex-col-reverse md:flex-row md:space-x-8 items-center w-full">
            <span className="w-full bg-[#fff] shadow rounded flex justify-center items-center px-5 py-6">
              {generalLoading ? (
                <Skeleton count={3} className="w-full" />
              ) : (
                <p className="font-Ubuntu text-sm font-normal">
                  {generalInfo?.about}
                </p>
              )}
            </span>
            <img
              src={vision}
              className="hidden md:block md:w-14"
              alt="Vision"
            />
          </div>

          {/* Mission Section */}
          <div className="flex flex-row md:space-x-8 items-center w-full">
            <img src={mission} className="hidden md:block w-14" alt="Mission" />
            <span className="h-[80px] w-full bg-[#1b1b1b] shadow rounded flex justify-center items-center px-5 py-6">
              {generalLoading ? (
                <Skeleton count={2} className="w-full" />
              ) : (
                <p className="font-Ubuntu text-sm font-normal text-white">
                  {generalInfo?.mission}
                </p>
              )}
            </span>
          </div>

          {/* Target Section */}
          <div className="flex flex-row md:space-x-8 items-center w-full">
            <span className="w-full bg-[#fff] shadow rounded flex justify-center items-center px-5 py-6">
              {generalLoading ? (
                <Skeleton count={4} className="w-full" />
              ) : (
                <p className="font-Ubuntu text-sm font-normal">
                  {generalInfo?.target}
                </p>
              )}
            </span>
            <img src={wwd} className="hidden md:block w-14" alt="What We Do" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
