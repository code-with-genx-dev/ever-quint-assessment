import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const Column = ({ title, tasks }: any) => {
    const { setNodeRef } = useDroppable({
        id: title,
    });

    const bgStatusMap: any = {
        "Backlog": "bg-[#d6d6d6]",
        "In Progress": "bg-[#dde7ff]",
        "Done": "bg-[#defae8]",
    };

    const titleStatusMap: any = {
        "Backlog": "text-[#474d51]",
        "In Progress": "text-[#0905fa]",
        "Done": "text-[#198a4c]",
    }
    const taskCountMap: any = {
        "Backlog": "bg-[#474d51] text-white",
        "In Progress": "bg-[#0905fa] text-white",
        "Done": "bg-[#198a4c] text-white",
    }
    return (
        <div ref={setNodeRef} className={`p-3 rounded-lg min-h-100 ${bgStatusMap[title]}`}>
            <div className="flex items-center justify-between mb-2">
                <p className={`font-semibold text-[16px]  ${titleStatusMap[title]}`}>{title}</p>
                <p className={`text-[12px] px-2 rounded-md inline-flex ${taskCountMap[title]}`}>{tasks.length}</p>
            </div>

            <div className="space-y-2">
                {tasks.map((task: any) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
};

export default Column;