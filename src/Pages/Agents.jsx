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
import AgentTable from "@/custom/DataTable";
import empty from "../../public/empty.svg";
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
                <div className="flex flex-col items-center mt-10 text-center space-y-4">
                    <img src={empty} alt="No meetings" className="w-md" />
                    <p className="text-muted-foreground">You haven’t created any meetings yet.</p>
                </div>
            ) : (
                <AgentTable agents={agents} onDelete={handleConfirmDelete} onRefresh={fetchAgents} />
            )}
        </div>
    );
}
