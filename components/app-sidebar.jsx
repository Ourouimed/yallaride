"use client"

import {
  Car,
  Home,
  MapPin,
  Settings,
  User,
  Users,
  Waypoints,
  ShipWheel,
  PlusCircle,
  ClipboardList,
} from "lucide-react"

import Image from "next/image"
import { NavMain } from "./nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

export function AppSidebar({ user, ...props }) {
  const role = user?.role || "passenger"
role
  const baseMenu = [
    { name: "Home", icon: Home, href: "/dashboard" },
    { name: "Profile", icon: User, href: "/dashboard/profile" },
    { name: "Networks", icon: Users, href: "/dashboard/networks" }
  ]

  const menus = {
    director: [
      ...baseMenu,
    ],
    driver: [
      ...baseMenu,
      { name: "My Rides", icon: Waypoints, href: "/dashboard/rides" },
    ],
    passenger: [
      ...baseMenu,
      { name: "My Trips", icon: Waypoints, href: "/dashboard/rides" },
    ],
  }

  const menu = menus[role] || baseMenu

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Header */}
      <SidebarHeader>
        <div className="p-4">
          <Image
            className="dark:hidden"
            src="/assets/logo-light.svg"
            alt="logo"
            height={35}
            width={125}
          />
          <Image
            className="hidden dark:block"
            src="/assets/logo-dark.svg"
            alt="logo"
            height={35}
            width={125}
          />
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <NavMain menu={menu} />
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
