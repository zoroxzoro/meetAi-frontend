import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useGetAgentsByUserMutation } from "@/redux/Api/AgentApi";

import Loading from "@/custom/Loading";
import ErrorMessage from "@/custom/Error";

export default function AgentsPage() {
    const { user, isLoaded } = useUser();
    const [getAgentsByUser, { data: agents = [], isLoading, isError, error }] = useGetAgentsByUserMutation();
    const [localLoading, setLocalLoading] = useState(true);

    useEffect(() => {
        if (isLoaded && user?.id) {
            getAgentsByUser(user.id);

            const timer = setTimeout(() => {
                setLocalLoading(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isLoaded, user]);

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
        return (
            <ErrorMessage message={error?.data?.message || "Something went wrong fetching your agents."} />
        );
    }

    return (
        <div className="p-6 w-full h-full">
            <h1 className="text-2xl font-bold mb-4">My Agents</h1>

            {agents?.length === 0 ? (
                <p className="text-muted-foreground">You haven’t created any agents yet.</p>
            ) : (
                <ul className="space-y-4 max-w-2xl">
                    {agents.map((agent) => (
                        <li key={agent._id} className="p-4 border rounded shadow-sm bg-white">
                            <h2 className="font-semibold">{agent.name}</h2>
                            <p className="text-muted-foreground">{agent.instruction}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
