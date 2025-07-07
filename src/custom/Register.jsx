import { SignUp } from "@clerk/clerk-react";
import { useEffect } from "react";

export default function RegisterPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-muted px-4">
            <div className="w-full max-w-4xl flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden bg-white">
                {/* Left: Clerk SignUp Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-8">
                    <div className="w-full max-w-md mr-10 sm:ml-[2rem]">
                        <h1 className="text-3xl font-bold text-center">Create account</h1>
                        <p className="text-md text-muted-foreground text-center mb-4">
                            Sign up to get started
                        </p>
                        <SignUp
                            path="/signup"
                            routing="path"
                            redirectUrl="/"
                            appearance={{
                                layout: {
                                    showOptionalFields: false,
                                    socialButtonsPlacement: "bottom",
                                },
                                elements: {
                                    formButtonPrimary: "bg-green-600 hover:bg-green-700 text-white w-full",
                                    card: "shadow-none border-none p-0",
                                    headerTitle: "text-xl font-semibold text-center",
                                    headerSubtitle: "text-muted-foreground text-center",
                                    socialButtonsBlockButton:
                                        "bg-white border hover:bg-gray-50 text-sm font-medium text-black w-full",
                                },
                            }}
                        />
                    </div>
                </div>

                {/* Right: Brand Panel (hidden on small screens) */}
                <div className="hidden md:flex w-1/2 bg-gradient-to-br from-sidebar-accent to-sidebar text-white flex-col items-center justify-center p-8">
                    <img src="/logo.svg" alt="logo" className="h-[100px] w-[100px]" />
                    <h1 className="text-3xl font-bold mt-4">Meet.AI</h1>
                </div>
            </div>
        </div>
    );
}
