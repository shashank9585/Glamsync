"use client"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, CheckCircle2, CreditCard, Clock, Calendar, Loader2 } from "lucide-react"

// Mock Services Data
const mockServices = [
  { id: "s1", name: "Haircut & Styling", price: 500, duration: "45 mins" },
  { id: "s2", name: "Hair Coloring", price: 1500, duration: "90 mins" },
  { id: "s3", name: "Facial Treatment", price: 800, duration: "60 mins" },
  { id: "s4", name: "Bridal Makeup Trial", price: 2500, duration: "120 mins" },
]

const timeSlots = ["10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"]

function BookingContent() {
  const searchParams = useSearchParams()
  const salonId = searchParams.get("salonId")
  const stylistId = searchParams.get("stylistId")

  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [isHomeService, setIsHomeService] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Step 1: Select Service
  const handleServiceSelect = (service: any) => {
    setSelectedService(service)
    setStep(2)
  }

  // Step 2: Select Date & Time
  const handleDateTimeSelect = () => {
    if (selectedDate && selectedTime) setStep(3)
  }

  // Step 3: Mock Payment
  const handlePayment = () => {
    setIsProcessing(true)
    // Simulate payment gateway processing
    setTimeout(() => {
      setIsProcessing(false)
      setStep(4)
    }, 2000)
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-3xl">
      <Link href={salonId ? `/salons/${salonId}` : `/stylists/${stylistId}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back
      </Link>

      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8 px-4">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            {s}
          </div>
        ))}
      </div>

      {/* Step 1: Service Selection */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Select a Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockServices.map((service) => (
              <div 
                key={service.id} 
                onClick={() => handleServiceSelect(service)}
                className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition"
              >
                <div>
                  <h3 className="font-semibold">{service.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3" /> {service.duration}
                  </p>
                </div>
                <Badge variant="secondary" className="text-lg px-3 py-1">₹{service.price}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Step 2: Date & Time */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Choose Date & Time</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Select Date</Label>
              <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </div>
            
            <div className="space-y-2">
              <Label>Select Time Slot</Label>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((time) => (
                  <Button 
                    key={time} 
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Add Home Service?</p>
                <p className="text-sm text-muted-foreground">Professional comes to your location (+₹200)</p>
              </div>
              <Button variant={isHomeService ? "default" : "outline"} onClick={() => setIsHomeService(!isHomeService)}>
                {isHomeService ? "Added" : "Add"}
              </Button>
            </div>

            <Button 
              className="w-full" 
              size="lg" 
              onClick={handleDateTimeSelect}
              disabled={!selectedDate || !selectedTime}
            >
              Continue to Payment
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Mock Payment */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" /> Secure Checkout
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service:</span>
                <span className="font-medium">{selectedService.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date & Time:</span>
                <span className="font-medium">{selectedDate} at {selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Home Service:</span>
                <span className="font-medium">{isHomeService ? "Yes (+₹200)" : "No"}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>₹{selectedService.price + (isHomeService ? 200 : 0)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium">Payment Method</p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <CreditCard className="h-6 w-6" /> Card
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <span className="text-xl font-bold text-blue-600">UPI</span>
                </Button>
              </div>
            </div>

            <Button 
              className="w-full" 
              size="lg" 
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing Payment...
                </>
              ) : (
                `Pay ₹${selectedService.price + (isHomeService ? 200 : 0)}`
              )}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              🔒 This is a mock payment for demo purposes. No real money will be charged.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Success */}
      {step === 4 && (
        <Card className="text-center py-12">
          <CardContent className="space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
              <p className="text-muted-foreground">
                Your appointment for <span className="font-medium text-foreground">{selectedService.name}</span> has been successfully booked.
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg text-left space-y-1 text-sm">
              <p><strong>Date:</strong> {selectedDate}</p>
              <p><strong>Time:</strong> {selectedTime}</p>
              <p><strong>Booking ID:</strong> #BOS-{Math.floor(Math.random() * 10000)}</p>
            </div>
            <Link href="/dashboard">
              <Button size="lg">View My Bookings</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="container mx-auto py-10 px-4 text-center">Loading booking...</div>}>
      <BookingContent />
    </Suspense>
  )
}