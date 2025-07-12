import React, { useEffect, useState } from "react";
import { CreateMeetingDialog } from "./CreateMeetingDialog";
import { useGetAgentsByUserMutation } from "@/redux/Api/AgentApi";
import { useCreateMeetingMutation, useGetMeetingsByUserMutation } from "@/redux/Api/meetingsApi";
import { useUser } from "@clerk/clerk-react";
import Loading from "@/custom/Loading";
import ErrorMessage from "@/custom/Error";
import { toast } from "sonner";
import MeetingTable from "@/custom/MeetingsTable"; // 👈 new import
import empty from "../../public/empty.svg";
const MeetingsPage = () => {
    const { user, isLoaded } = useUser();
    const [getAgentsByUser, { data: agents = [] }] = useGetAgentsByUserMutation();
    const [getMeetingsByUser, { data: meetingData, isLoading: loadingMeetings }] = useGetMeetingsByUserMutation();
    const [createMeeting] = useCreateMeetingMutation();

    const [localLoading, setLocalLoading] = useState(true);

    useEffect(() => {
        if (isLoaded && user?.id) {
            getAgentsByUser(user.id);
            getMeetingsByUser(user.id);
            const t = setTimeout(() => setLocalLoading(false), 500);
            return () => clearTimeout(t);
        }
    }, [isLoaded, user]);

    const handleCreateMeeting = async ({ title, agent }) => {
        try {
            await createMeeting({ title, agent, userId: user.id }).unwrap();
            toast.success("Meeting created successfully");
            getMeetingsByUser(user.id); // Refresh meeting list
        } catch (err) {
            console.error("Create Meeting Error:", err);
            toast.error(err?.data?.message || "Failed to create meeting");
        }
    };

    if (!isLoaded || loadingMeetings || localLoading) {
        return <Loading title="Loading Meetings..." />;
    }

    return (
        <div className="p-6">
            <div className="flex justify-between gap-10 items-center mb-4">
                <h1 className="text-2xl font-bold">My Meetings</h1>
                <CreateMeetingDialog agents={agents} onCreate={handleCreateMeeting} />
            </div>

            {meetingData?.meetings?.length > 0 ? (
                <MeetingTable meetings={meetingData.meetings} />
            ) : (
                <div className="flex flex-col items-center mt-10 text-center space-y-4">
                    <img src={empty} alt="No meetings" className="w-md" />
                    <p className="text-muted-foreground">You haven’t created any meetings yet.</p>
                </div>
            )}
        </div>
    );
};

export default MeetingsPage;
