import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerFooter,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { CreateAgentDialog } from "@/custom/CreateAgentsDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function CreateMeetingDialog({ agents = [], onCreate }) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [agentId, setAgentId] = useState("");
    const isMobile = useIsMobile();

    const handleSubmit = () => {
        if (!title || !agentId) {
            toast.error("Please enter all fields");
            return;
        }

        onCreate?.({ title, agent: agentId });
        setTitle("");
        setAgentId("");
        setOpen(false);
        toast.success("Meeting created");
    };

    const Form = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <Select value={agentId} onValueChange={setAgentId}>
                <SelectTrigger>
                    <SelectValue placeholder="Select an agent" />
                </SelectTrigger>
                <SelectContent>
                    {agents.map((agent) => (
                        <SelectItem key={agent._id} value={agent._id}>
                            <div className="flex items-center gap-2">
                                <Avatar className="w-5 h-5">
                                    <AvatarImage
                                        src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${agent.name}`}
                                        alt={agent.name}
                                    />
                                    <AvatarFallback>
                                        {agent.name?.charAt(0).toUpperCase() || "A"}
                                    </AvatarFallback>
                                </Avatar>
                                <span>{agent.name}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <p className="text-sm text-muted-foreground">
                Not found what you're looking for?{" "}
                <CreateAgentDialog
                    triggerButton={
                        <button className="text-green-600 underline">Create new agent</button>
                    }
                    onSuccess={() => toast.success("New agent created")}
                />
            </p>

            <div className="flex flex-col gap-3 mt-4">
                <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button
                    className="bg-green-600 text-white hover:bg-green-700"
                    onClick={handleSubmit}
                >
                    Create
                </Button>
            </div>
        </div>
    );

    const Wrapper = isMobile ? Drawer : Dialog;
    const Trigger = isMobile ? DrawerTrigger : DialogTrigger;
    const Content = isMobile ? DrawerContent : DialogContent;
    const Header = isMobile ? DrawerHeader : DialogHeader;
    const Title = isMobile ? DrawerTitle : DialogTitle;
    const Footer = isMobile ? DrawerFooter : DialogFooter;

    return (
        <Wrapper open={open} onOpenChange={setOpen}>
            <Trigger asChild>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                    + New Meeting
                </Button>
            </Trigger>

            <Content className="p-6">
                <Header>
                    <Title>New Meeting</Title>
                    {!isMobile && (
                        <DialogDescription>Create a new meeting</DialogDescription>
                    )}
                </Header>

                {Form}
                <Footer />
            </Content>
        </Wrapper>
    );
}
