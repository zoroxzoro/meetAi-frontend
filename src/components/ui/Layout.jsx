import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Navbar from "@/custom/Navbar";
import { AppSidebar } from "@/custom/SidebarCompo";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <SidebarProvider>
            <div className="flex h-screen w-screen overflow-hidden">
                <AppSidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                    {/* Navbar with toggle */}
                    <div className="h-16 w-full flex items-center px-4 shadow-sm bg-background z-10">
                        <SidebarTrigger />
                        <Navbar />
                    </div>

                    {/* Main Page Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <Outlet />
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}
