import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Sparkles, Scissors, Calendar, Camera, Heart, TrendingUp, Star, MapPin, Mail, Phone, Send } from "lucide-react"
import FadeIn from "@/components/ui/fade-in"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Background Image */}
      <section className="relative space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 min-h-[80vh] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80" 
            alt="Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
        </div>
        
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto relative z-10">
          <FadeIn>
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Your AI-Powered Glamour<br className="hidden sm:inline" />
              <span className="text-primary">Platform</span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Discover top salons, find expert stylists, plan your bridal journey, or describe an inspiration look. 
              GlamSync matches you with the perfect experience and books it instantly.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.4}>
            <div className="flex gap-4 flex-wrap justify-center mt-4">
              <Link href="/planner">
                <Button size="lg" className="text-lg px-8 shadow-lg hover:shadow-xl transition-all">
                  <Sparkles className="mr-2 h-5 w-5" /> AI Beauty Planner
                </Button>
              </Link>
              <Link href="/salons">
                <Button size="lg" variant="outline" className="text-lg px-8 shadow-lg hover:shadow-xl transition-all">
                  Find a Salon
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container space-y-6 py-8 md:py-12 lg:py-24 mx-auto">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <FadeIn>
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Choose Your Journey</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Multiple ways to discover and plan your perfect beauty experience
            </p>
          </FadeIn>
        </div>
        
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2 lg:grid-cols-4 mt-12">
          <FadeIn delay={0.1}>
            <Link href="/stylists">
              <Card className="hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full border-2 hover:border-primary/20">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Scissors className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl">Find a Stylist</h3>
                  <p className="text-sm text-muted-foreground">Browse portfolios and book top-rated experts.</p>
                </CardContent>
              </Card>
            </Link>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Link href="/bridal">
              <Card className="hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full border-2 hover:border-primary/20">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl">Bridal Hub</h3>
                  <p className="text-sm text-muted-foreground">Complete wedding beauty planning and timelines.</p>
                </CardContent>
              </Card>
            </Link>
          </FadeIn>

          <FadeIn delay={0.3}>
            <Link href="/inspiration">
              <Card className="hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full border-2 hover:border-primary/20">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Camera className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl">Inspiration Studio</h3>
                  <p className="text-sm text-muted-foreground">Describe a look, let AI match you with the right stylist.</p>
                </CardContent>
              </Card>
            </Link>
          </FadeIn>

          <FadeIn delay={0.4}>
            <Link href="/mens">
              <Card className="hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full border-2 hover:border-primary/20">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Scissors className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl">Men's Grooming</h3>
                  <p className="text-sm text-muted-foreground">Dedicated grooming plans for the modern man.</p>
                </CardContent>
              </Card>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <FadeIn delay={0.1}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground">Happy Customers</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
                <p className="text-muted-foreground">Expert Stylists</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">4.9</div>
                <p className="text-muted-foreground">Average Rating</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">24/7</div>
                <p className="text-muted-foreground">AI Support</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Featured Salons Preview */}
      <section className="container space-y-6 py-8 md:py-12 lg:py-24 mx-auto">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <FadeIn>
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Featured Salons</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Discover our top-rated salons across the city
            </p>
          </FadeIn>
        </div>
        
        <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-12">
          <FadeIn delay={0.1}>
            <Link href="/salons/1">
              <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80" 
                    alt="Luxe Hair Studio" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg mb-2">Luxe Hair Studio</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>Mumbai</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">4.8</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Link href="/salons/2">
              <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80" 
                    alt="Glow Spa & Salon" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg mb-2">Glow Spa & Salon</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>Delhi</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">4.5</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </FadeIn>

          <FadeIn delay={0.3}>
            <Link href="/salons/3">
              <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80" 
                    alt="Beauty Bliss" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg mb-2">Beauty Bliss</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>Bangalore</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">4.9</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </FadeIn>
        </div>

        <div className="text-center mt-12">
          <Link href="/salons">
            <Button size="lg" variant="outline" className="text-lg px-8">
              View All Salons
            </Button>
          </Link>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <FadeIn>
                <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-4">Get in Touch</h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 mx-auto">
                  Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </FadeIn>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <FadeIn delay={0.2}>
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                          <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">Email Us</h3>
                          <p className="text-muted-foreground">support@glamsync.com</p>
                          <p className="text-muted-foreground">info@glamsync.com</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                          <Phone className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">Call Us</h3>
                          <p className="text-muted-foreground">+91 9876543210</p>
                          <p className="text-muted-foreground">Mon-Sat, 9 AM - 9 PM</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                          <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">Visit Us</h3>
                          <p className="text-muted-foreground">123 Beauty Street</p>
                          <p className="text-muted-foreground">Mumbai, Maharashtra 400001</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </FadeIn>

              {/* Contact Form */}
              <FadeIn delay={0.3}>
                <Card>
                  <CardContent className="p-6">
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input id="name" placeholder="John Doe" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="john@example.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="How can we help?" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea 
                          id="message" 
                          placeholder="Tell us more about your inquiry..." 
                          rows={5}
                          required 
                        />
                      </div>
                      <Button type="submit" className="w-full" size="lg">
                        <Send className="mr-2 h-4 w-4" /> Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Look?</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of happy customers who trust BeautyOS for their beauty needs
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get Started Today
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}