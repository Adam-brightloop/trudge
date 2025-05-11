"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function MainNav() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  
  // This ensures we only render client-side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])
  
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

  if (!mounted) {
    return null
  }

  return (
    <NavigationMenu className="hidden md:flex" aria-label="Main navigation">
      <NavigationMenuList>
        {routes.map((route) => (
          <NavigationMenuItem key={route.href}>
            {/* Use a div to maintain styling */}
            <div className={cn(
              "rounded-md transition-colors duration-300",
              route.active 
               ? "bg-transparent border-2 border-[#C1440E] dark:border-gray-400" 
               : "bg-transparent border-2 border-transparent hover:border-[#C1440E] dark:hover:border-gray-200"
            )}>
              <Link href={route.href} 
                className={cn(
                  "block px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#C1440E] focus:ring-offset-2",
                  route.active 
                   ? "text-[#C1440E] dark:text-gray-200 font-semibold" 
                   : "text-[#4D2C1D] hover:text-[#C1440E] dark:text-gray-400 dark:hover:text-gray-400"
                )}
              >
                {route.label}
              </Link>
            </div>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}