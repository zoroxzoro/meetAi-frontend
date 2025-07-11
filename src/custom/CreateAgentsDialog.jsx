import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/clerk-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    useCreateAgentMutation,
    useUpdateAgentMutation,
} from "@/redux/Api/AgentApi";
import { toast } from "sonner";
import { PlusIcon } from "lucide-react";

export function CreateAgentDialog({ onSuccess, agent = null, triggerButton = null }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [instruction, setInstruction] = useState("");
    const { user } = useUser();
    const isMobile = useIsMobile();

    const [createAgent, { isLoading: creating }] = useCreateAgentMutation();
    const [updateAgent, { isLoading: updating }] = useUpdateAgentMutation();

    const isEdit = !!agent;

    useEffect(() => {
        if (agent) {
            setName(agent.name);
            setInstruction(agent.instruction);
        } else {
            setName("");
            setInstruction("");
        }
    }, [agent]);

    const handleSubmit = async () => {
        if (!name || !instruction || !user?.id) return;

        try {
            if (isEdit) {
                await updateAgent({
                    agentId: agent._id, // ✅ FIXED this to match your RTK
                    name,
                    instruction,
                }).unwrap();
                toast.success("Agent updated");
            } else {
                await createAgent({
                    name,
                    instruction,
                    user: user.id,
                }).unwrap();
                toast.success("Agent created");
            }

            setName("");
            setInstruction("");
            setOpen(false);
            onSuccess?.();
        } catch (err) {
            console.error(err);
            toast.error("Failed to submit");
        }
    };

    const FormContent = (
        <div className="flex flex-col gap-4">
            <div className="flex justify-center">
                <img
                    src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=agent"
                    className="w-14 h-14"
                    alt="agent"
                />
            </div>
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Textarea
                placeholder="Instructions"
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
            />
            <div className="flex flex-col gap-4 mt-4">
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={handleSubmit}
                    disabled={creating || updating}
                >
                    <PlusIcon />
                    {creating || updating ? "Saving..." : isEdit ? "Update" : "Create"}
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
                {triggerButton || (
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <PlusIcon />
                        {isEdit ? "Edit Agent" : "Create Agent"}
                    </Button>
                )}
            </Trigger>
            <Content className="p-6">
                <Header>
                    <Title>{isEdit ? "Edit Agent" : "New Agent"}</Title>
                    {!isMobile && (
                        <DialogDescription>
                            {isEdit ? "Update this agent" : "Create a new agent"}
                        </DialogDescription>
                    )}
                </Header>
                {FormContent}
                <Footer />
            </Content>
        </Wrapper>
    );
}
