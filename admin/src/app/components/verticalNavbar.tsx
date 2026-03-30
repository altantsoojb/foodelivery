"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Truck } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Food Menu", href: "/FoodMenu", icon: LayoutDashboard },
  { title: "Orders", href: "/orders", icon: Truck },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-4 pt-8 pb-4">
        <div className="flex items-center gap-3 pl-7">
          <img src="/food-icon.svg" alt="Food Icon" width={40} height={40} />
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-2xl font-bold text-black">NomNom</span>
            <span className="text-sm text-gray-400">Swift delivery</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title} className="pl-7 pt-4">
                  <SidebarMenuButton
                    asChild
                    className={
                      pathname === item.href
                        ? "bg-black text-white hover:bg-black hover:text-white w-41.25 justify-center pt-2"
                        : "w-41.25 justify-center pt-2"
                    }
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
