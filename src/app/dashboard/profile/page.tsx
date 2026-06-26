"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, Trash2, AlertTriangle } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const [name, setName] = useState("John Doe") 
  const [email, setEmail] = useState("john@example.com")
  const [phone, setPhone] = useState("+91 9876543210")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Profile updated successfully! (Mock)")
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Password changed successfully! (Mock)")
    setCurrentPassword("")
    setNewPassword("")
  }

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      alert("Account deleted. Redirecting to home... (Mock)")
      router.push("/")
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-3xl">
      <Link href="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold mb-8">Profile & Settings</h1>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details and contact information.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>
              <Button type="submit" className="mt-4"><Save className="mr-2 h-4 w-4" /> Save Changes</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Change your password to keep your account secure.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
              </div>
              <Button type="submit" variant="outline">Update Password</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2"><AlertTriangle className="h-5 w-5" /> Danger Zone</CardTitle>
            <CardDescription>Irreversible and destructive actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Delete Account</p>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data.</p>
              </div>
              <Button variant="destructive" onClick={handleDeleteAccount}><Trash2 className="mr-2 h-4 w-4" /> Delete Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}