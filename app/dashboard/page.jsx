'use client'
import DashboardLayout from "./dashboardLayout"
import { useAuth } from "@/context/AuthContext"

export default function Page() {
  const { user } = useAuth()
  return <>
    <DashboardLayout>
       <h3 className="text-xl font-semibold">Welcome {user?.fullname}</h3>
    </DashboardLayout>
  </>
}
