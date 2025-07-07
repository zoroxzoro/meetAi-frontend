import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Navbar from "@/custom/Navbar";
import { AppSidebar } from "@/custom/SidebarCompo";

export default function Layout({ children }) {
    return (
        <SidebarProvider>
            <div className="flex h-screen">
                <AppSidebar />
                <div className="relative flex-1 overflow-y-auto">
                    {/* Sidebar Toggle Button - visible on all screens */}
                    <div className="fixed top-0 flex-row flex items-center">
                        <Navbar >

                            <SidebarTrigger className="absolute top-4 left-4 z-50" />
                        </Navbar>
                    </div>

                    {/* Main Page Content */}
                    <div className="p-6 pt-16">
                        {children}
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}
