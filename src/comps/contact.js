import spo from '../image/spo.png';
import spon from '../image/spon.png';
import sor from '../image/sor.png';

const Contact = () => {
    return ( 
        <>
        <div className=" w-full px-5 md:px-10 lg:px-20 pb-20">
            <p className=" font-medium font-Ubuntu text-2xl md:text-3xl text-center text-[#121212]">Talk To Someone</p>
            <div className=" w-full flex justify-center items-center mt-10">
                <div className=" flex w-full md:w-[450px] flex-col items-center justify-center space-y-5">
                    <span className=" w-full flex flex-col justify-center items-center font-Ubuntu text-sm font-normal text-[#121212]">
                        <input placeholder="Full-Name" type="text" className=" w-full md:w-[450px] h-[48px] bg-transparent p-2 border border-black placeholder:font-Ubuntu"  />
                    </span>
                    <span className=" w-full flex flex-col justify-center items-center font-Ubuntu text-sm font-normal text-[#121212]">
                        <input placeholder="Email" type="text" className=" w-full md:w-[450px] h-[48px] bg-transparent p-2 border border-black placeholder:font-Ubuntu"  />
                    </span>
                    <span className=" w-full flex flex- justify-center items-center font-Ubuntu text-sm font-normal text-[#121212]">
                        <textarea cols="30" rows="8" placeholder="Your Message" type="text" className=" w-full md:w-[450px] bg-transparent p-2 border border-black placeholder:font-Ubuntu"  />
                    </span>
                    <button className=' text-center bg-black text-white block ml-auto mt-8 px-4 py-2 border border-black text-base font-medium font-Ubuntu'>Send</button>
                </div>
            </div>
            <div className=" w-[100%]">
                <p className=" font-Ubuntu font-medium text-2xl text-center md:text-3xl my-10 text-[#121212]">Our Sponsors</p>
                <div className=' flex w-full md:flex-row flex-col items-center space-y-10 md:space-y-0 justify-between'>
                    <img src={ spo }  className=' w-[150px]' alt="" />
                    <img src={ spon } className=' w-[150px]'  alt="" />
                    <img src={ sor }  className=' w-[150px]' alt="" />
                </div>
            </div>
        </div>
        </>
     );
}
 
export default Contact;