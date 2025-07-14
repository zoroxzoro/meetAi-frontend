import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

export default function MeetingTable({ meetings = [], showStartButton = false }) {
    const [page, setPage] = useState(1);
    const perPage = 5;

    const getStatusColor = (status) => {
        switch (status) {
            case "upcoming":
                return "bg-blue-100 text-blue-700 border border-blue-300";
            case "active":
                return "bg-green-100 text-green-700 border border-green-300";
            case "completed":
                return "bg-gray-100 text-gray-700 border border-gray-300";
            case "processing":
                return "bg-yellow-100 text-yellow-700 border border-yellow-300";
            case "cancelled":
                return "bg-red-100 text-red-700 border border-red-300";
            default:
                return "bg-muted text-muted-foreground";
        }
    };

    const totalPages = Math.ceil(meetings.length / perPage);
    const paginatedMeetings = meetings.slice(
        (page - 1) * perPage,
        page * perPage
    );

    const handleStartMeeting = (meetingId) => {
        // You can redirect or trigger Stream call logic here
        console.log("Start meeting:", meetingId);
        // Example: navigate(`/meeting/${meetingId}`);
    };

    return (
        <div className="w-full max-w-5xl mx-auto mt-6 border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Meeting</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Agent</TableHead>
                        <TableHead>Created</TableHead>
                        {showStartButton && <TableHead>Action</TableHead>}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {paginatedMeetings.map((meeting) => (
                        <TableRow key={meeting._id}>
                            <TableCell className="font-medium">{meeting.name}</TableCell>
                            <TableCell>
                                <Badge className={`capitalize ${getStatusColor(meeting.status)}`}>
                                    {meeting.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage
                                            src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${meeting.agent?.name}`}
                                            alt={meeting.agent?.name}
                                        />
                                        <AvatarFallback>
                                            {meeting.agent?.name?.charAt(0).toUpperCase() || "A"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span>{meeting.agent?.name || "N/A"}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                                {new Date(meeting.createdAt).toLocaleString()}
                            </TableCell>
                            {showStartButton && (
                                <TableCell>
                                    <button
                                        onClick={() => handleStartMeeting(meeting._id)}
                                        className="px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700"
                                    >
                                        Start
                                    </button>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Pagination className="py-4 justify-center">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => page > 1 && setPage(page - 1)}
                            aria-disabled={page === 1}
                        />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                isActive={page === i + 1}
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => page < totalPages && setPage(page + 1)}
                            aria-disabled={page === totalPages}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}

