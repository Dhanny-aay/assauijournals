// import Contact from "../comps/contact";
import ContactPrompt from "../comps/contactPrompt";
import Footer from "../comps/footer";
import Navbar from "../comps/navbar";
import { useJournals } from "../contexts/journalsContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

const JournalPage = () => {
  const { journals, loading: journalsLoading } = useJournals();

  return (
    <>
      <div className="  w-full h-[400px] bg-hero bg-cover text-white bg-no-repeat relative">
        <Navbar />
        <div className=" mt-16 w-full px-5 md:px-10 lg:px-20md:mt-32 text-[25px] md:text-4xl font-Ubuntu font-semibold flex flex-col justify-center items-center">
          <p className="text-center lg:w-[900px]">
            Welcome to Our Journal: A Space for Ideas, Reflection, and
            Discovery!
          </p>
          <p className="text-center mt-5 text-lg text-[#bdbbbb] font-medium">
            Exploring Perspectives, Sharing Insights, and Fostering Intellectual
            Growth
          </p>
        </div>
      </div>

      <div className=" w-full px-5 md:px-10 lg:px-20 py-16">
        <p className=" font-medium font-Ubuntu text-center text-2xl md:text-3xl text-[#121212]">
          Journals
        </p>

        <div
          className={`w-full grid grid-cols-1 md:grid-cols-2 mt-8 md:mt-16 ${
            journals.length === 1
              ? "lg:grid-cols-1"
              : journals.length === 2
              ? "lg:grid-cols-2"
              : journals.length === 3
              ? "lg:grid-cols-3"
              : "lg:grid-cols-3"
          } gap-6`}
        >
          {journalsLoading
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
            : journals.map((journal) => (
                <div
                  key={journal.id}
                  className={`w-full  shadow-sm border border-[#6767677d] rounded-[8px] relative`}
                >
                  <img
                    src={journal.coverImageUrl}
                    className="w-full h-[305px]  rounded-[8px]"
                    alt={journal.fileName}
                  />
                  <div className=" w-full p-4">
                    <div className="mt-3 flex item-center justify-between w-full">
                      <p className=" text-xl text-black font-Ubuntu capitalize font-semibold">
                        {journal.name}
                      </p>
                      <a
                        href={journal.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black  hover:text-blue-600"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </a>
                    </div>
                    <p className=" mt-3 font-Ubuntu font-normal text-sm text-[#000000c3]">
                      {journal.excerpt}
                    </p>
                  </div>
                  {/* <Link
                            to="/journals"
                            className="bottom-5 right-6 text-sm text-[#000] font-Ubuntu font-medium absolute cursor-pointer"
                            onClick={() =>
                              (window.location.href = `/journals/${journal.id}`)
                            }
                          >
                            Read More...
                          </Link> */}
                </div>
              ))}
        </div>
      </div>

      <ContactPrompt />
      <Footer />
    </>
  );
};

export default JournalPage;
