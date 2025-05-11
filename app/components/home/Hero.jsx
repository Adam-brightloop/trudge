import Link from "next/link"
import Image from "next/image"

export function Hero() {
    return (
      <div className="relative h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero_image.png" // Place your image in the public folder
        alt="Football field with a sunset"
        fill
        priority
        className="object-cover brightness-120" // Slightly darken the image
      />
      
      {/* Optional gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-6 px-4 z-10">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-adobe">
            Welcome to Apex Dynasty Hub
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-adobe">
            Your one-stop destination for all things Apex Dynasty Fantasy Football.
          </p>
          <Link href="/about" className="mt-6 inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-md shadow-lg hover:bg-blue-200 transition duration-300">
            Learn More
          </Link>
        </div>
      </div>
    </div>
    
        /*<section className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#C1440E] to-[#F5F5F5] dark:from-[#1E1E2D] dark:to-[#2A2A3B]">
        <div className="text-center">
            <h1 className="text-4xl font-bold text-white">Welcome to Apex Dynasty Hub</h1>
            <p className="mt-4 text-lg text-gray-200">Your one-stop destination for all things Apex Dynasty Fantasy Football.</p>
            <Link href="/about" className="mt-6 inline-block px-6 py-3 text-lg font-semibold text-white bg-[#C1440E] rounded-md shadow-lg hover:bg-[#A03B0B] transition duration-300">
            Learn More
            </Link>
        </div>
        </section>*/
    )
}