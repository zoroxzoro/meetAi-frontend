// src/pages/MeetingRoom.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { StreamVideo, StreamVideoClient, StreamCall } from '@stream-io/video-react-sdk';

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

const MeetingRoom = () => {
    const { id: meetingId } = useParams();
    const { user, isLoaded } = useUser();
    const [videoClient, setVideoClient] = useState(null);
    const [call, setCall] = useState(null);

    useEffect(() => {
        if (!isLoaded || !user || !meetingId) return;

        const init = async () => {
            try {
                const res = await fetch(`/api/token`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: user.id,
                    }),
                });

                const { token } = await res.json();

                const client = new StreamVideoClient({
                    apiKey,
                    user: {
                        id: user.id,
                        name: user.fullName || user.username,
                        image: user.imageUrl,
                    },
                    token,
                });

                const call = client.call('default', meetingId);
                await call.join();
                setVideoClient(client);
                setCall(call);
            } catch (err) {
                console.error('Meeting join error:', err);
            }
        };

        init();

        return () => {
            if (call) call.leave();
        };
    }, [isLoaded, user, meetingId]);

    if (!videoClient || !call) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-black text-white text-xl">
                Joining meeting...
            </div>
        );
    }

    return (
        <div className="w-full overflow-hidden h-full bg-black">
            <StreamVideo client={videoClient}>
                <StreamCall call={call} />
            </StreamVideo>
        </div>
    );
};

export default MeetingRoom;
