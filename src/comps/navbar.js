import { Link } from "react-router-dom";
import menu from "../image/menu.png";

const Navbar = () => {
  function overlay() {
    //check classlist
    const overlayDiv = document.getElementById("overlay");
    if (overlayDiv.classList.contains("-translate-y-[500px]")) {
      overlayDiv.classList.remove("-translate-y-[500px]");
    } else if (!overlayDiv.classList.contains("-translate-y-[500px]")) {
      overlayDiv.classList.add("-translate-y-[500px]");
    }
  }

  return (
    <>
      <div
        id="overlay"
        className=" w-full bg-[#121212d3] backdrop-blur-sm h-[400px] flex justify-center items-center -translate-y-[500px] shadow transition-all duration-500 absolute z-[1]"
      >
        <div className=" flex flex-col justify-center items-center space-y-5">
          <Link to="/" className=" font-medium text-base font-Ubuntu">
            Home
          </Link>
          <Link to="/journals" className=" font-medium text-base font-Ubuntu">
            Journals
          </Link>
          <Link to="/editors" className=" font-medium text-base font-Ubuntu">
            Editors
          </Link>
        </div>
      </div>
      <div className=" w-full text-white px-5 md:px-10 lg:px-20 py-5 flex flex-row items-end justify-between z-[9999999]">
        <Link
          to="/"
          className=" text-white font-bold text-2xl md:text-3xl font-Ubuntu z-[9999999]"
        >
          Assaui Journals
        </Link>
        <span className=" md:flex flex-row space-x-7 items-end hidden">
          <Link to="/" className=" font-medium text-base font-Ubuntu">
            Home
          </Link>
          <Link to="/journals" className=" font-medium text-base font-Ubuntu">
            Journals
          </Link>
          <Link to="/editors" className=" font-medium text-base font-Ubuntu">
            Editors
          </Link>
        </span>
        <img
          src={menu}
          onClick={overlay}
          className="z-[9999999] block md:hidden"
          alt=""
        />
      </div>
    </>
  );
};

export default Navbar;
