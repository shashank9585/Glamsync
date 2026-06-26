import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

// POST: Create a new booking
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    // For the MVP demo, we allow mock bookings if not logged in
    const userId = session?.user?.email || "guest-user"

    const { salonId, stylistId, serviceId, date, time, isHomeService } = await req.json()

    // In production, you would save to Prisma:
    // const booking = await prisma.booking.create({
    //   data: { userId, salonId, stylistId, serviceId, date, time, isHomeService, status: "CONFIRMED" }
    // })
    
    const mockBooking = {
      id: `BOS-${Math.floor(Math.random() * 10000)}`,
      userId: userId,
      salonId: salonId || "1",
      stylistId: stylistId || "1",
      serviceId: serviceId || "1",
      date: date,
      time: time,
      isHomeService: isHomeService || false,
      status: "CONFIRMED",
      createdAt: new Date().toISOString()
    }

    return NextResponse.json({ success: true, booking: mockBooking })
  } catch (error) {
    console.error("Booking creation error:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}

// GET: Fetch user's bookings
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    // In production, fetch from Prisma:
    // const bookings = await prisma.booking.findMany({ where: { userId: session.user.id } })
    
    // For MVP, return mock data so the dashboard isn't empty
    const mockBookings = [
      { id: "1", salonName: "Luxe Hair Studio", serviceName: "Hair Color & Cut", date: "2026-07-15", time: "2:00 PM", status: "CONFIRMED" },
      { id: "2", salonName: "Glow Spa & Salon", serviceName: "Facial Treatment", date: "2026-07-20", time: "11:00 AM", status: "PENDING" }
    ]

    return NextResponse.json(mockBookings)
  } catch (error) {
    console.error("Booking fetch error:", error)
    return NextResponse.json([])
  }
}