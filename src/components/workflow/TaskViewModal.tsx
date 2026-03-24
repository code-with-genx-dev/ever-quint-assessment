import { IoMdClose } from "react-icons/io";
import { useTaskStore } from "../../store/useTaskStore";
import Sidebar from "../UI/Sidebar";


const TaskViewModal = () => {
    const { selectedTask, setSelectedTask } = useTaskStore();

    if (!selectedTask) return null;

    return (
        <Sidebar visible={!!selectedTask} onHide={() => setSelectedTask(null)} customHeader={true} header={
            <div className="shrink-0 flex justify-between items-center px-4 py-3 border-b text-white bg-violet-600">
                <h3 className="font-semibold text-white text-[15px]">Task details</h3>
                <button onClick={() => setSelectedTask(null)} className="cursor-pointer p-1 rounded hover:bg-violet-700 transition-colors">
                    <IoMdClose size={18} />
                </button>
            </div>
        }>
            {selectedTask && (<div className="bg-white w-full space-y-3" >
                <h2 className="text-[16px] font-semibold">
                    {selectedTask.title}
                </h2>

                <p className="text-[14px] text-gray-600">
                    {selectedTask.description || "No description"}
                </p>

                <div className="text-[13px] space-y-1">
                    <p><b>Status:</b> {selectedTask.status}</p>
                    <p><b>Priority:</b> {selectedTask.priority}</p>
                    <p><b>Assignee:</b> {selectedTask.assignee}</p>
                    <p><b>Tags:</b> {selectedTask.tags.join(", ")}</p>
                </div>

                <div className="text-[12px] text-gray-400">
                    <p>Created: {new Date(selectedTask.createdAt).toLocaleString()}</p>
                    {(selectedTask?.history?.length ?? 0) > 0 && (
                        <div className="mt-3">
                            <p className="font-semibold text-[14px]">History</p>

                            <div className="text-[12px] text-gray-500 space-y-1 mt-1">
                                {selectedTask?.history?.map((h: any, i: number) => (
                                    <p key={i}>
                                        {h.from} → {h.to} (
                                        {new Date(h.movedAt).toLocaleString()})
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </div>)}
        </Sidebar>
    );
};

export default TaskViewModal;