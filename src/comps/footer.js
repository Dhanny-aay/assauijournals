const Footer = () => {
    return ( 
        <>
        <div className=" w-full px-5 md:px-10 lg:px-20 py-10 bg-[#121212]">
            <div className=" flex md:flex-row flex-col items-center justify-between mb-8">
                <p className=" font-Ubuntu text-2xl text-white font-semibold">Assaui Journals</p>
                <span className=" flex flex-row space-x-8 mt-6 md:mt-0">
                    <p className=" font-medium text-sm text-white font-Ubuntu">Blog</p>
                    <p className=" font-medium text-sm text-white font-Ubuntu">Journals</p>
                    <p className=" font-medium text-sm text-white font-Ubuntu">Editors</p>
                    <p className=" font-medium text-sm text-white font-Ubuntu">About</p>
                </span>
            </div>

            <div className='border-t border-[#585858]'>
                <div className='flex md:flex-row flex-col-reverse justify-center items-center md:justify-between w-full mt-8'>
                    <p className=' text-sm mt-6 md:mt-0 font-Ubuntu font-normal text-[#fff]'>© 2023 Assaui Journals. All Rights Reserved.</p>
                    <p className="text-[#fff]">social</p>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default Footer;