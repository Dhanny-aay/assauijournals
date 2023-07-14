import ptr from '../image/ptr.jpg';
import port from '../image/port.jpg';
import portra from '../image/potra.jpg';

const Editors = () => {
    return ( 
        <>
        <div className=" w-full px-5 md:px-10 lg:px-20 pb-20">
            <p className=" font-medium font-Ubuntu text-center text-2xl md:text-3xl text-[#121212]">Editors</p>
            <div className="flex space-y-10 lg:space-y-0 items-center lg:justify-between flex-col lg:flex-row mt-8">
                <div className=" w-full md:w-[330px] rounded h-[370px] bg-transparent relative">
                    <img src={ ptr } className=' w-full h-[170px] rounded-t' alt="" />
                    <p className=' m-3 text-base font-Ubuntu font-semibold'>Dr. Catherine Lawson</p>
                    <p className=' m-3 font-Ubuntu font-normal text-sm '>Dr. Catherine Lawson is a highly accomplished and respected professional in her field. With extensive knowledge and experience, she has made significant contributions to her area of expertise.</p>
                </div>
                <div className=" w-full md:w-[330px] text-[#121212] rounded h-[370px] bg-transparent relative">
                    <img src={ port } className=' w-full h-[170px] rounded-t' alt="" />
                    <p className=' m-3 text-base font-Ubuntu font-semibold'>Capt. Samuel Montgomery</p>
                    <p className=' m-3 font-Ubuntu font-normal text-sm '>Captain Samuel Montgomery is a courageous and skilled leader with a strong sense of duty and honor. As a captain, he has demonstrated exceptional leadership qualities in various challenging situations.</p>
                </div>
                <div className=" w-full md:w-[330px] rounded h-[370px] bg-transparent relative">
                    <img src={ portra } className=' w-full h-[170px] rounded-t'alt="" />
                    <p className=' m-3 text-base font-Ubuntu font-semibold'>Prof. Amelia Gallagher</p>
                    <p className=' m-3 font-Ubuntu font-normal text-sm '>Professor Amelia Gallagher is a highly regarded academic who is passionate about her subject and dedicated to fostering intellectual growth and development. With an extensive background in research and teaching,</p>
                </div>
            </div>
            <button className=' text-center block ml-auto mt-8 px-4 py-2 border border-black text-base font-medium font-Ubuntu'>Meet More</button>
        </div>
        </>
     );
}
 
export default Editors;