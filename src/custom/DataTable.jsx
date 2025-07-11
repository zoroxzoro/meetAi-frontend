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
    PaginationNext,
    PaginationPrevious,
    PaginationLink,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PencilIcon, Trash2Icon, VideoIcon } from "lucide-react";
import { CreateAgentDialog } from "@/custom/CreateAgentsDialog";
import { toast } from "sonner";
import { useState } from "react";

export default function AgentTable({ agents, onDelete, onRefresh }) {
    const [page, setPage] = useState(1);
    const perPage = 5;

    const totalPages = Math.ceil(agents.length / perPage);
    const paginatedAgents = agents.slice((page - 1) * perPage, page * perPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="mt-10 rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Agent</TableHead>
                        <TableHead>Instructions</TableHead>
                        <TableHead className="text-center">Meetings</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {paginatedAgents.map((agent) => (
                        <TableRow key={agent._id}>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage
                                            src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${agent.name}`}
                                            alt={agent.name}
                                        />
                                        <AvatarFallback>
                                            {agent.name?.charAt(0).toUpperCase() || "A"}
                                        </AvatarFallback>
                                    </Avatar>
                                    {agent.name}
                                </div>
                            </TableCell>

                            <TableCell className="text-muted-foreground text-sm">
                                {agent.instruction}
                            </TableCell>

                            <TableCell className="text-center">
                                <Badge className="text-blue-600" variant="outline">
                                    <VideoIcon className="w-4 h-4 mr-1" /> 5 meetings
                                </Badge>
                            </TableCell>

                            <TableCell className="text-right flex gap-2 justify-end">
                                <CreateAgentDialog
                                    agent={agent}
                                    onSuccess={onRefresh}
                                    triggerButton={
                                        <Button variant="ghost" size="icon">
                                            <PencilIcon className="w-4 h-4 text-primary" />
                                        </Button>
                                    }
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                        toast("Are you sure you want to delete this agent?", {
                                            action: {
                                                label: "Delete",
                                                onClick: () => onDelete(agent._id),
                                            },
                                        })
                                    }
                                >
                                    <Trash2Icon className="w-4 h-4 text-red-600" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* ShadCN Pagination */}
            <Pagination className="px-4 py-4">
                <PaginationContent className="justify-end">
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handlePageChange(page - 1)}
                            aria-disabled={page === 1}
                        />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                isActive={page === i + 1}
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => handlePageChange(page + 1)}
                            aria-disabled={page === totalPages}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
