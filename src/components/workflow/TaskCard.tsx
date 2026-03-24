import { useDraggable } from "@dnd-kit/core";
import { useTaskStore } from "../../store/useTaskStore";
import moment from "moment";
import { getInitials } from "../../utils/common";
import { RxDragHandleHorizontal } from "react-icons/rx";
import Tags from "../UI/Tags";


const TaskCard = ({ task }: any) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    });
    const { setSelectedTask, setEditTask, setTaskModalOpen } = useTaskStore();

    const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
    };

    const bgPriorityMap: any = {
        "Low": "bg-green-500",
        "Medium": "bg-amber-500",
        "High": "bg-red-500",
    };

    const initials = getInitials(task.assignee);


    return (
        <div ref={setNodeRef}
            style={style}
            className="bg-white p-2 rounded-md shadow cursor-pointer"
        >
            <div className="flex items-center justify-between mb-1">
                <p className={`text-[10px] text-white inline-flex rounded-md px-2 items-center justify-center ${bgPriorityMap[task.priority]}`}>{task.priority}</p>
                <div {...listeners} {...attributes} className="cursor-grab text-gray-400 mb-1">
                    <RxDragHandleHorizontal size={22} />
                </div>
            </div>
            <div className="flex flex-col gap-1.5 text-[14px]">
                <div className="leading-5">
                    <p className="font-semibold text-[#222]">{task.title}</p>
                    <p title={task.description} className="text-[12px] text-[#222] truncate">{task.description}</p>
                </div>
                <div>
                    <div className="flex items-center gap-2 text-[#222]">
                        <span className="text-[#222] font-semibold">Assignee: </span>
                        <div className="flex items-center gap-1">
                            <div className="w-5 h-5 rounded-full bg-violet-500 text-white flex items-center justify-center text-[10px]">
                                {initials}
                            </div>
                            {task.assignee}
                        </div>
                    </div>
                </div>
                <div>
                    <Tags items={task.tags} />
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-[12px]">{moment(task.createdAt).format("DD/MM/YYYY")}</p>
                    <div className="flex items-center gap-1">
                        <button onClick={() => setSelectedTask(task)} className=" text-[13px] rounded-md cursor-pointer text-[#222] bg-gray-300 px-3">View</button>
                        <button onClick={() => { setEditTask(task), setTaskModalOpen(true); }} className="text-[13px] rounded-md cursor-pointer  bg-violet-600 text-white px-3">Edit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;