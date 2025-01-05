import ptr from "../image/ptr.jpg";
import port from "../image/port.jpg";
import portra from "../image/potra.jpg";
import { useEditors } from "../contexts/editorsContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

const Editors = () => {
  const { editors, loading: editorsLoading } = useEditors();

  console.log(editors);
  return (
    <>
      <div className=" w-full px-5 md:px-10 lg:px-20 pb-20">
        <p className=" font-medium font-Ubuntu text-center text-2xl md:text-3xl text-[#121212]">
          Editors
        </p>
        <div
          className={`w-full grid grid-cols-1 md:grid-cols-2 mt-8 md:mt-16 ${
            editors.length === 1
              ? "lg:grid-cols-1"
              : editors.length === 2
              ? "lg:grid-cols-2"
              : editors.length === 3
              ? "lg:grid-cols-3"
              : "lg:grid-cols-3"
          } gap-6`}
        >
          {editorsLoading
            ? Array(3)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="w-full  shadow-sm rounded-[8px] h-[370px] bg-[#f5f5f5]"
                  >
                    <Skeleton height={170} />
                    <div className="p-3">
                      <Skeleton height={20} />
                      <Skeleton count={3} />
                    </div>
                  </div>
                ))
            : editors.slice(0, 3).map((journal) => (
                <div
                  key={journal.id}
                  className={`w-full border border-[#6767676c] rounded-[8px] relative`}
                >
                  <img
                    src={journal.imageUrl}
                    className="w-full h-[305px]  rounded-[8px]"
                    alt={journal.fileName}
                  />

                  <div className=" w-full p-4">
                    <p className="mt-3 text-xl text-black font-Ubuntu capitalize font-semibold">
                      {journal.name}
                    </p>
                    <p className="text-gray-500 text-sm font-Ubuntu mt-1">
                      {journal.position}
                    </p>
                    <p className="mt-3 font-Ubuntu font-normal text-sm text-[#000000c3]">
                      {journal.about}
                    </p>
                  </div>
                </div>
              ))}
        </div>
        <Link to="/editors">
          <button className=" text-center block ml-auto mt-8 px-4 py-2 border border-black text-base font-medium font-Ubuntu">
            Meet More
          </button>
        </Link>
      </div>
    </>
  );
};

export default Editors;
