import Navbar from "./navbar";

const Hero = () => {
    return ( 
        <>
        <div className=" w-full h-[100vh] bg-hero bg-cover text-white bg-no-repeat relative">
            <Navbar/>
            <div className=" w-full px-5 md:px-10 lg:px-20 mt-20 md:mt-32 text-[25px] md:text-4xl font-Ubuntu font-semibold">
                <p className=" lg:w-[900px]">Embrace the Power of Expression: Contribute to Our Collective Journaling Experience!</p>
                <p className=" mt-5 text-lg text-[#bdbbbb] font-medium">Connecting Through Written Expression</p>
            </div>
            <div className=" w-full absolute bottom-0 md:px-10 lg:px-[15%]">
                <div className=" w-full h-[220px] bg-[#bbb9b9a1] relative rounded-t-md text-black pr-24">
                    <span className=" bg-[#1b1b1b] flex rounded-bl-md h-[60px] w-[220px] rotate-90 translate-y-[80px] -translate-x-[80px] justify-center items-center text-[#fff]">
                        <p className=" rotate-180 font-Ubuntu text-sm md:text-base font-medium">Latest Posts</p>
                    </span>
                    <p className=" font-Ubuntu text-base md:text-lg font-medium translate-x-[80px] -translate-y-[30px]">This is a new topic</p>
                    <p className="font-Ubuntu text-sm font-normal translate-x-[80px] mt-3 -translate-y-[30px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempor nunc et gravida mollis. Praesent feugiat elit mattis quam consectetur efficitur.</p>
                    <button className=" absolute bottom-3 right-6 px-2 md:px-4 py-2 border border-black font-Ubuntu text-sm md:text-base font-medium text-[#121212]">Read More</button>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default Hero;