import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const role = token?.role as string
    const pathname = req.nextUrl.pathname

    // Protect routes based on user role
    if (pathname.startsWith("/dashboard") && role !== "CUSTOMER") {
      return NextResponse.redirect(new URL("/login", req.url))
    }
    
    if (pathname.startsWith("/salon-dashboard") && role !== "SALON") {
      return NextResponse.redirect(new URL("/login", req.url))
    }
    
    if (pathname.startsWith("/stylist-dashboard") && role !== "STYLIST") {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Require authentication for all matched routes
    },
  }
)

// Apply middleware only to these specific routes
export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/salon-dashboard/:path*", 
    "/stylist-dashboard/:path*", 
    "/booking/:path*"
  ],
}