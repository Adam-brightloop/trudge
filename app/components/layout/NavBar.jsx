import Link from "next/link"
import Image from "next/image"
import { MainNav } from "@/app/components/navigation/MainNav"
import { MobileNav } from "@/app/components/navigation/MobileNav"
import { ThemeToggle } from "@/app/components/navigation/ThemeToggle"


export function Navbar() {
  return (
    <header className=" bg-adobe dark:bg-gray-800">
      {/* Add a spacer div to prevent content jump when navbar appears/disappears */}                                         
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <MobileNav />
          <Link href="/" className="flex justify-center items-center  ml-4">
            <Image 
                src="/ApexLogo.svg"
                alt="Apex Dynasty Fantasy Football league Logo"
                width={0} // Set to 0 to let CSS control size
                height={0} // Set to 0 to let CSS control size
                className="block dark:hidden h-10 w-auto"
            /> 
            <Image 
                src="/ApexLogo.svg"
                alt="Apex Dynasty Fantasy Football league Logo"
                width={0} // Set to 0 to let CSS control size
                height={0} // Set to 0 to let CSS control size
              
                className="hidden dark:block h-10 w-auto" // Show only in dark mode
            />
            
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <MainNav />
        </div>
      </div>
    </header>
  )
}