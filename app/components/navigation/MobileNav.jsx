"use client"

import Image from "next/image"
import { Menu, Home, Info, UserRoundPlus  } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  
  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/about",
      label: "About",
      active: pathname === "/about",
    },
    {
      href: "/drafts",
      label: "Drafts",
      active: pathname === "/drafts" || pathname.includes("/drafts"),
    }
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-background backdrop-blur-sm" >
      <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
      <div className="flex items-center ml-8 mt-4">
        <Image 
          src="/ApexLogo.svg"
          alt="Apex Dynasty Fantasy Football league Logo"
          width={200}
          height={200}
          className="block dark:hidden " // Show only in light mode
        /> 
        <Image 
          src="/ApexLogo.svg"
          alt="Apex Dynasty Fantasy Football league Logo"
          width={200}
          height={200}
          className="hidden dark:block" // Show only in dark mode
        />
      </div>
        <nav className="flex flex-col gap-4 mt-8 ml-6 ">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center p-3 rounded-lg transition-all",
                "hover:bg-accent  dark:hover:bg-gray-200 dark:hover:text-gray-900",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                route.active 
                  ? "bg-primary/20 text-primary font-medium" 
                  : "text-muted-foreground"
              )}
            >
              {/* Add icons for each route */}
              {route.label === "Home" && <Home className="mr-3 h-5 w-5" />}
              {route.label === "About" && <Info className="mr-3 h-5 w-5" />}
              {route.label === "Drafts" && <UserRoundPlus className="mr-3 h-5 w-5" />}
              {route.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}