import ContactPrompt from "../comps/contactPrompt";
import Footer from "../comps/footer";
import Navbar from "../comps/navbar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { useEditors } from "../contexts/editorsContext";

const EditorsPage = () => {
  const { editors, loading: editorsLoading } = useEditors();

  return (
    <>
      <div className=" w-full h-[400px] bg-hero bg-cover text-white bg-no-repeat relative">
        <Navbar />
        <div className=" mt-16 w-full px-5 md:px-10 lg:px-20md:mt-32 text-[25px] md:text-4xl font-Ubuntu font-semibold flex flex-col justify-center items-center">
          <p className="text-center lg:w-[900px]">
            Meet Our Editors: Pioneering Thoughtful Expression and Inspiring
            Change!
          </p>
          <p className="text-center mt-5 text-lg text-[#bdbbbb] font-medium">
            Shaping Voices, Crafting Stories, and Uniting Communities through
            Thoughtful Dialogue
          </p>
        </div>
      </div>

      <div className=" w-full px-5 md:px-10 lg:px-20 py-16">
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
            : editors.map((journal) => (
                <div
                  key={journal.id}
                  className={`w-full border border-[#6767676c] rounded-[8px] relative`}
                >
                  <img
                    src={journal.imageUrl}
                    className="w-full h-[305px]  rounded-[8px]"
                    alt={journal.fileName}
                  />

                  <div className=" py-4">
                    <p className="m-3 text-xl text-black font-Ubuntu capitalize font-semibold">
                      {journal.name}
                    </p>
                    <p className="m-3 font-Ubuntu font-normal text-sm text-[#000000c3]">
                      {journal.about}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>

      <ContactPrompt />

      <Footer />
    </>
  );
};

export default EditorsPage;
