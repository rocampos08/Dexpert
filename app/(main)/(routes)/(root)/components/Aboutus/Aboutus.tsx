import Link from 'next/link';

export function Aboutus(){
    return(

      
        <div className=" flex flex-col md:flex-row items-center justify-center min-h-screen px-6 md:px-10 py-10 gap-10">
      {}
      <div className="w-full md:w-1/2 text-black">
        <p className="text-sm uppercase font-semibold mb-2 items-center justify-center">About Us:</p>
        <h1> </h1>
        <h2 className="text-4xl font-bold leading-tight mb-4 text-blue-500">
          We believe in what <br /> you can be
        </h2>
        <p className="text-base mb-6">
        Dexpert is an inclusive platform that connects young people with no work experience to micro and small businesses, allowing them to participate in real projects, gain practice, develop skills, and strengthen their professional profile.
 
        </p>
        <Link href="#contact-section" passHref>
                    <button className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition">
                        Contact Us
                    </button>
                </Link>
      </div>
 
      {}
      <div>
        <img
          src="/auimage2.png"
          alt="Editor at Work"
          className= "relative -top-8 w-[400px] h-auto"
        />
      </div>
    </div>
 
 
    );
}