"use client"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet"
import { Scissors, User, LogOut, Menu } from "lucide-react"

const navLinks = [
  { href: "/salons", label: "Salons" },
  { href: "/stylists", label: "Stylists" },
  { href: "/planner", label: "AI Planner" },
  { href: "/inspiration", label: "Inspiration" },
  { href: "/bridal", label: "Bridal" },
  { href: "/mens", label: "Men's" },
]

export default function Navbar() {
  const { data: session } = useSession()

  // Helper to get the correct dashboard URL based on role
  const getDashboardLink = () => {
    if (!session?.user?.role) return "/dashboard"
    const role = session.user.role as string
    if (role === "CUSTOMER") return "/dashboard"
    return `/${role.toLowerCase()}-dashboard`
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Scissors className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">GlamSync</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-primary transition">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <>
              <Link href={getDashboardLink()}>
                <Button variant="outline"><User className="mr-2 h-4 w-4" /> Dashboard</Button>
              </Link>
              <Button variant="ghost" onClick={() => signOut()}><LogOut className="h-4 w-4" /></Button>
            </>
          ) : (
            <Link href="/login"><Button>Sign In</Button></Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-lg font-medium hover:text-primary transition">
                    {link.label}
                  </Link>
                ))}
                <div className="border-t pt-6 flex flex-col gap-3">
                  {session ? (
                    <>
                      <Link href={getDashboardLink()}>
                        <Button variant="outline" className="w-full justify-start"><User className="mr-2 h-4 w-4" /> Dashboard</Button>
                      </Link>
                      <Button variant="ghost" className="justify-start" onClick={() => signOut()}>
                        <LogOut className="mr-2 h-4 w-4" /> Sign Out
                      </Button>
                    </>
                  ) : (
                    <Link href="/login"><Button className="w-full">Sign In</Button></Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}