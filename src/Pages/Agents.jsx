import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import {
    useGetAgentsByUserMutation,
    useDeleteAgentMutation,
} from "@/redux/Api/AgentApi";
import Loading from "@/custom/Loading";
import ErrorMessage from "@/custom/Error";
import { CreateAgentDialog } from "@/custom/CreateAgentsDialog";
import { Trash2Icon, PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AgentsPage() {
    const { user, isLoaded } = useUser();
    const [getAgentsByUser, { data: agents = [], isLoading, isError, error }] =
        useGetAgentsByUserMutation();
    const [deleteAgent] = useDeleteAgentMutation();
    const [localLoading, setLocalLoading] = useState(true);

    const fetchAgents = () => {
        if (user?.id) getAgentsByUser(user.id);
    };

    useEffect(() => {
        if (isLoaded && user?.id) {
            fetchAgents();
            const timer = setTimeout(() => setLocalLoading(false), 500);
            return () => clearTimeout(timer);
        }
    }, [isLoaded, user]);

    const handleDelete = async (agentId) => {
        try {
            await deleteAgent({ agentId, userId: user.id }).unwrap();
            toast.success("Agent deleted");
            fetchAgents();
        } catch (err) {
            toast.error("Failed to delete agent");
            console.error(err);
        }
    };

    const handleConfirmDelete = (agentId) => {
        toast.warning("Are you sure you want to delete this agent?", {
            action: {
                label: "Delete",
                onClick: () => handleDelete(agentId),
            },
            cancel: {
                label: "Cancel",
            },
            duration: 8000,
        });
    };

    if (!isLoaded) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loading title="Initializing user..." description="Authenticating with Clerk..." />
            </div>
        );
    }

    if (isLoading || localLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loading title="Loading agents..." description="Please wait while we fetch your agents." />
            </div>
        );
    }

    if (isError) {
        return <ErrorMessage message={error?.data?.message || "Something went wrong fetching your agents."} />;
    }

    return (
        <div className="p-6 mt-[-2rem] w-full h-full">
            <div className="flex gap-6 flex-row justify-between">
                <h1 className="text-2xl font-bold mb-4">My Agents</h1>
                <CreateAgentDialog onSuccess={fetchAgents} />
            </div>

            {agents.length === 0 ? (
                <p className="text-muted-foreground">You haven’t created any agents yet.</p>
            ) : (
                <ul className="space-y-4 mt-10 max-w-2xl">
                    {agents.map((agent) => (
                        <li key={agent._id} className="p-4 border rounded shadow-sm bg-white flex justify-between items-start">
                            <div>
                                <h2 className="font-semibold">{agent.name}</h2>
                                <p className="text-muted-foreground">{agent.instruction}</p>
                            </div>
                            <div className="flex gap-2">
                                {/* Edit */}
                                <CreateAgentDialog
                                    agent={agent}
                                    onSuccess={fetchAgents}
                                    triggerButton={
                                        <Button variant="ghost" size="icon">
                                            <PencilIcon className="w-4 h-4 text-primary" />
                                        </Button>
                                    }
                                />

                                {/* Delete using toast.confirm */}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleConfirmDelete(agent._id)}
                                >
                                    <Trash2Icon className="w-4 h-4 text-red-600" />
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
