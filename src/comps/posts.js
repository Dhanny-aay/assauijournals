import posOne from '../image/posone.jpg';
import postwo from '../image/postwo.jpg';
import posThree from '../image/posthree.jpg';

const Posts = () => {
    return ( 
        <>
        <div className=" w-full px-5 md:px-10 lg:px-20 py-20">
            <p className=" font-medium font-Ubuntu text-center text-2xl md:text-3xl text-[#121212]">Blogs</p>
            <div className="flex space-y-10 lg:space-y-0 items-center lg:justify-between flex-col lg:flex-row mt-8">
                <div className=" w-full md:w-[330px] shadow-sm rounded h-[370px] bg-[#fff] relative">
                    <img src={ posOne } className=' w-full h-[170px] rounded-t' alt="" />
                    <p className=' m-3 text-base font-Ubuntu font-semibold'>The Impact of Technology on Society</p>
                    <p className=' m-3 font-Ubuntu font-normal text-sm '>Technology has transformed every aspect of our lives, revolutionizing the way we communicate, work, and navigate the world. From smartphones that connect us instantly...</p>
                    <p className=' bottom-5 right-6 text-sm text-[#bbb] font-Ubuntu font-medium absolute'>Read More...</p>
                </div>
                <div className=" w-full md:w-[330px] text-white shadow-sm rounded h-[370px] bg-[#1b1b1b] relative">
                    <img src={ postwo } className=' w-full h-[170px] rounded-t' alt="" />
                    <p className=' m-3 text-base font-Ubuntu font-semibold'>Exploring Sustainable Living Practices</p>
                    <p className=' m-3 font-Ubuntu font-normal text-sm '>As environmental issues take center stage, the exploration of sustainable living practices has become increasingly vital. Sustainable living encompasses...</p>
                    <p className=' bottom-5 right-6 text-sm text-[#bbb] font-Ubuntu font-medium absolute'>Read More...</p>
                </div>
                <div className=" w-full md:w-[330px] shadow-sm rounded h-[370px] bg-[#fff] relative">
                    <img src={ posThree } className=' w-full h-[170px] rounded-t'alt="" />
                    <p className=' m-3 text-base font-Ubuntu font-semibold'>The Power of Storytelling in Shaping Culture</p>
                    <p className=' m-3 font-Ubuntu font-normal text-sm '>Storytelling has been an integral part of human culture since ancient times, serving as a powerful medium for conveying knowledge, traditions, and...</p>
                    <p className=' bottom-5 right-6 text-sm text-[#8b8989] font-Ubuntu font-medium absolute'>Read More...</p>
                </div>
            </div>
            <button className=' text-center block ml-auto mt-10 px-4 py-2 border border-black text-base font-medium font-Ubuntu'>View More</button>
        </div>
       
        </>
     );
}
 
export default Posts;