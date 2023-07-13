import mission from '../image/mission.png';
import vision from '../image/vision.png';
import wwd from '../image/wwd.png';
import spo from '../image/spo.jpg';
import spon from '../image/spon.jpg';
import sor from '../image/sor.jpg';

const About = () => {
    return ( 
        <>
        <div className="  w-full px-5 md:px-10 lg:px-20 pb-20 flex flex-col">
            <div className=" w-[100%]">
                <p className=" font-Ubuntu font-medium text-2xl md:text-3xl text-[#121212]">About us</p>
                <div className=" flex flex-col w-full mt-10 space-y-8 md:space-y-10">
                    <div className=" flex flex-col-reverse md:flex-row md:space-x-8 items-center w-full">
                        <span className=" w-full bg-[#fff] shadow rounded flex justify-center items-center px-5 py-6">
                            <p className=' font-Ubuntu text-sm font-normal'>
                            KUJUA is the Postgraduate Journal of The African Studies Students' Association, Institute of African Studies, University of Ibadan. It is a peer-reviewed, open-access academic online journal...
                            </p>
                        </span>
                        <img src={ vision } className="hidden md:block md:w-14" alt="" />
                    </div>
                    <div className=" flex flex-row md:space-x-8 items-center w-full">
                        <img src={ mission } className="hidden md:block w-14" alt="" />
                        <span className=" h-[80px] w-full bg-[#1b1b1b] shadow rounded flex justify-center items-center px-5 py-6">
                            <p className=' font-Ubuntu text-sm font-normal text-white'>
                            Our mission is to provide comprehensive support, resources, and opportunities that foster personal and professional growth.
                            </p>
                        </span>
                    </div>
                    <div className=" flex flex-row md:space-x-8 items-center w-full">
                        <span className=" w-full bg-[#fff] shadow rounded flex justify-center items-center px-5 py-6">
                            <p className=' font-Ubuntu text-sm font-normal'>
                            At [Organization Name], we are dedicated to transforming lives through our diverse range of programs and services. We offer tailored solutions that address the specific needs of individuals, empowering them to unlock their true potential. Our initiatives include educational workshops, skill-building seminars, mentoring programs, and community outreach efforts.
                            </p>
                        </span>
                        <img src={ wwd } className="hidden md:block w-14" alt="" />
                    </div>
                </div>
            </div>
            <div className=" w-[100%]">
                <p className=" font-Ubuntu font-medium text-2xl md:text-3xl my-10 text-[#121212]">Our Sponsors</p>
                <div className=' flex w-full md:flex-row flex-col items-center space-y-10 md:space-y-0 justify-around'>
                    <img src={ spo }  className=' w-[150px]' alt="" />
                    <img src={ spon } className=' w-[150px]'  alt="" />
                    <img src={ sor }  className=' w-[150px]' alt="" />
                </div>
            </div>
        </div>
        </>
     );
}
 
export default About;