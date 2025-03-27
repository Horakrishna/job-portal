import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  // Logic for search
  const { setSearchFilter, setIsSearched } = useContext(AppContext);
  // use Ref hooks
  const titleRef = useRef(null);
  const locationRef = useRef(null);
  // On search function
  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
    // console.log({
    //   title: titleRef.current.value,
    //   location: locationRef.current.value,
    // });
  };
  return (
    <div className="container 2xl:px-20 mx-auto my-10">
      <div className="bg-gradient-to-r from-purple-800 to-purple-900 text-white py-16 text-center mx-2 rounded-xl">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
          Over 10,000+ jobs to apply
        </h1>
        <p className="mb-8 max-w-xl mx-auto text-sm px-5 font-light">
          Your Next Big Career Move Starts Right Here - Explore the Best Job
          Opportunities and Take the First Step Toward Your Future!
        </p>
        <div className="flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto">
          <div className="flex items-center">
            <img className="h-4 sm:h-5" src={assets.search_icon} alt="" />
            <input
              ref={titleRef}
              type="text"
              placeholder="Search for Job"
              className="max-sm:text-xs p-2 rounded outline-none w-full"
            />
          </div>
          <div className="flex items-center">
            <img className="h-4 sm:h-5" src={assets.location_icon} alt="" />
            <input
              ref={locationRef}
              type="text"
              placeholder="Location"
              className="max-sm:text-xs p-2 rounded outline-none w-full"
            />
          </div>
          <button
            onClick={onSearch}
            className="bg-blue-600 text-white px-6 py-2 rounded m-1"
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md">
        <div className="flex justify-center gap-10 lg:gap-16 flex-wrap">
          <p className="font-medium">Trusted by</p>
          <img className="h-6 sm:h-3" src={assets.microsoft_logo} alt="" />
          <img className="h-6 sm:h-3" src={assets.walmart_logo} alt="" />
          <img className="h-6 sm:h-3" src={assets.accenture_logo} alt="" />
          <img className="h-6 sm:h-3" src={assets.samsung_logo} alt="" />
          <img className="h-6 sm:h-3" src={assets.amazon_logo} alt="" />
          <img className="h-6 sm:h-3" src={assets.adobe_logo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
