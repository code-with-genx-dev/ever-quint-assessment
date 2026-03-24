import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { CiNoWaitingSign } from "react-icons/ci";


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
            <div className="flex items-center justify-between mb-3">
                <p className={`font-semibold text-[16px]  ${titleStatusMap[title]}`}>{title}</p>
                <p className={`text-[12px] px-2 rounded-md inline-flex ${taskCountMap[title]}`}>{tasks.length}</p>
            </div>

            <div className="space-y-2">
                {tasks.length === 0 ? (
                    <div className="text-center  text-[12px] text-gray-500 py-4 border border-dashed rounded-md">
                       <p className="flex items-center gap-2 justify-center"> <CiNoWaitingSign color="#222" /> No tasks yet</p>
                    </div>
                ) : (
                    tasks.map((task: any) => (
                        <TaskCard key={task.id} task={task} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Column;