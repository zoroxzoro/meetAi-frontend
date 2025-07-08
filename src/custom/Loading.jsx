import React from "react";
import { Loader2Icon } from "lucide-react";

const Loading = ({ title = "Loading...", description = "Please wait" }) => {
    return (
        <div className="h-full w-full flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
                <Loader2Icon className="size-6 animate-spin text-primary" />
                <div className="flex flex-col gap-y-2 text-center">
                    <h6 className="text-lg font-medium">{title}</h6>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default Loading;
