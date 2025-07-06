import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export function UserDropdownOrLoginButton() {
    const { user, isSignedIn } = useUser();
    const { signOut } = useClerk();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        navigate("/login");
    };

    if (!isSignedIn || !user) {
        return (
            <SidebarMenuButton onClick={() => navigate("/login")}>
                Login
            </SidebarMenuButton>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                    <img
                        src={user.imageUrl}
                        alt="User"
                        className="w-6 h-6 rounded-full object-cover mr-2"
                    />
                    {user.fullName || "User"}
                    <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
            >
                <DropdownMenuItem onClick={() => navigate("/account")}>
                    <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/billing")}>
                    <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <span>Sign out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
