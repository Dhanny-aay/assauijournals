import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className=" w-full px-5 md:px-10 lg:px-20 py-10 bg-[#121212]">
        <div className=" flex md:flex-row flex-col items-center justify-between mb-8">
          <Link
            to="/"
            className=" font-Ubuntu text-2xl text-white font-semibold"
          >
            Assaui Journals
          </Link>
          <span className=" flex flex-row space-x-8 mt-6 md:mt-0">
            <Link
              to="/"
              className=" font-medium text-base text-white font-Ubuntu"
            >
              Home
            </Link>
            <Link
              to="/journals"
              className=" font-medium text-base text-white font-Ubuntu"
            >
              Journals
            </Link>
            <Link
              to="/editors"
              className=" font-medium text-base text-white font-Ubuntu"
            >
              Editors
            </Link>
          </span>
        </div>

        <div className="border-t border-[#585858]">
          <div className="flex md:flex-row flex-col-reverse justify-center items-center  w-full mt-8">
            <p className=" text-sm mt-6 md:mt-0 font-Ubuntu font-normal text-[#fff]">
              © 2025 Assaui Journals. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
