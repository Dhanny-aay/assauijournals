import { Link } from "react-router-dom";
import { useJournals } from "../contexts/journalsContext";
import Navbar from "./navbar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Hero = () => {
  const { journals, loading: journalsLoading } = useJournals();

  //   console.log(journals);

  const latestJournal = journals.reduce((latest, journal) => {
    return new Date(journal.uploadedAt) > new Date(latest.uploadedAt)
      ? journal
      : latest;
  }, journals[0] || {});

  return (
    <>
      <div className=" w-full h-svh bg-hero bg-cover text-white bg-no-repeat relative">
        <Navbar />
        <div className=" w-full px-5 md:px-10 lg:px-20 mt-20 md:mt-32 text-[25px] md:text-4xl font-Ubuntu font-semibold">
          <p className=" lg:w-[900px]">
            Embrace the Power of Expression: Contribute to Our Collective
            Journaling Experience!
          </p>
          <p className=" mt-5 text-lg text-[#bdbbbb] font-medium">
            Connecting Through Written Expression
          </p>
        </div>
        {/* Latest Journal Section */}
        <div className="w-full absolute bottom-0 md:px-10 lg:px-[15%]">
          <div className="w-full h-[220px] bg-[#bbb9b9a1] relative rounded-t-md text-black pr-24">
            <span className="bg-[#1b1b1b] flex rounded-bl-md h-[60px] w-[220px] rotate-90 translate-y-[80px] -translate-x-[80px] justify-center items-center text-[#fff]">
              <p className="rotate-180 font-Ubuntu text-sm md:text-base font-medium">
                Latest Journal
              </p>
            </span>
            {journalsLoading ? (
              <div className="translate-x-[80px] -translate-y-[30px]">
                <Skeleton width={200} height={20} />
                <Skeleton width="90%" height={15} className="mt-3" />
                <Skeleton width="80%" height={15} />
                <Skeleton width={100} height={35} className=" mt-3" />
              </div>
            ) : (
              <div className="translate-x-[80px] -translate-y-[30px] ">
                <p className="font-Ubuntu text-base md:text-lg font-medium">
                  {latestJournal.name}
                </p>
                <p className="font-Ubuntu text-sm font-normal mt-3">
                  {latestJournal.excerpt}
                </p>
                {/* <Link></Link> */}
                {/* <Link
                  to="/journals"
                  className="absolute -bottom-[100px] right-6 px-2 md:px-4 py-2 border border-black font-Ubuntu text-sm md:text-base font-medium text-[#121212]"
                >
                  Read More
                </Link> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
