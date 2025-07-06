import { Separator } from "@/components/ui/separator"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { BotIcon, StarIcon, VideoIcon } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { UserDropdownOrLoginButton } from "./UserButton"

export function AppSidebar() {
    const location = useLocation();

    const firstSection = [
        {
            icon: VideoIcon,
            label: "Meetings",
            href: "/meetings"
        }, {
            icon: BotIcon,
            label: "Agents",
            href: "/agents"
        }
    ]
    const secondSection = [
        {
            icon: StarIcon,
            label: "Upgrade",
            href: "/upgrade"
        }
    ]
    return (
        <Sidebar>
            <SidebarHeader className={"text-sidebar-accent-foreground "}>
                <Link to="/" className="flex items-center gap-2.5 px-2 pt-2">
                    <img src="/logo.svg" alt="" />
                    <p className="font-bold text-2xl">Assit.Ai</p>
                </Link>
            </SidebarHeader>
            <div className="px-4 py-2">
                <Separator className="opacity-10 text-[#5D6B68]" />
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item,) => (
                                <SidebarMenuItem
                                    key={item.href}
                                >
                                    <SidebarMenuButton
                                        className={cn(
                                            "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                                        )}
                                    >

                                        <Link to={item.href} className="flex items-center" >
                                            <item.icon className="mr-2 h-4 w-4" />
                                            <span className="text-lg font-medium">{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className="px-4 py-2">
                    <Separator className="opacity-10 text-[#5D6B68]" />
                </div>
                {/* second section */}
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondSection.map((item,) => (
                                <SidebarMenuItem
                                    key={item.href}
                                >
                                    <SidebarMenuButton
                                        className={cn(
                                            "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                                        )}
                                    >

                                        <Link to={item.href} className="flex items-center" >
                                            <item.icon className="mr-2 h-4 w-4" />
                                            <span className="text-lg font-medium">{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <UserDropdownOrLoginButton className="p-4 z-50 relative overflow-visible" />
            </SidebarFooter>
        </Sidebar >
    )
}