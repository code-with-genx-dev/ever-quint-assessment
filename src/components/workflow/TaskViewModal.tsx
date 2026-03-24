import { IoMdClose } from "react-icons/io";
import { useTaskStore } from "../../store/useTaskStore";
import Sidebar from "../UI/Sidebar";
import Tags from "../UI/Tags";
import { getInitials } from "../../utils/common";
import { MdHistory } from "react-icons/md";


const TaskViewModal = () => {
    const { selectedTask, setSelectedTask } = useTaskStore();

    if (!selectedTask) return null;

    const bgPriorityMap: any = {
        "Low": "bg-green-500",
        "Medium": "bg-amber-500",
        "High": "bg-red-500",
    };

    const initials = getInitials(selectedTask.assignee);

    return (
        <Sidebar visible={!!selectedTask} onHide={() => setSelectedTask(null)} customHeader={true} header={
            <div className="shrink-0 flex justify-between items-center px-4 py-3 border-b text-white bg-violet-600">
                <h3 className="font-semibold text-white text-[15px]">Task details</h3>
                <button onClick={() => setSelectedTask(null)} className="cursor-pointer p-1 rounded hover:bg-violet-700 transition-colors">
                    <IoMdClose size={18} />
                </button>
            </div>
        }>
            {selectedTask && (<div className="bg-white text-[#222] w-full space-y-3" >
                <div className="flex items-center gap-2">
                    <p className="bg-gray-300 text-[#222] px-2 rounded text-[12px] inline-block font-semibold">Task Name</p>
                    <p className={bgPriorityMap[selectedTask.priority] + " text-white px-2 rounded text-[10px] inline-block"}>
                        {selectedTask.priority}
                    </p>
                </div>
                <p className="text-[18px] font-semibold">
                    {selectedTask.title}
                </p>

                <div className="text-[14px] p-1 border rounded border-gray-300 bg-gray-100">
                    <p> {selectedTask.description || "No description"}</p>
                </div>

                <div className="text-[13px] space-y-4">
                    <p><b>Status:</b> {selectedTask.status}</p>
                    <p><span className="font-bold">Created:</span> {new Date(selectedTask.createdAt).toLocaleString()}</p>
                    <div className="flex items-center gap-1">
                        <b>Assignee:</b>
                        <div className="flex items-center gap-1 rounded-full px-2 py-0.5  bg-gray-200 w-max">
                            <div className="w-5.5 h-5.5 rounded-full bg-violet-500 text-white flex items-center justify-center text-[12px]">
                                {initials}
                            </div>
                            {selectedTask.assignee}
                        </div>
                    </div>
                    <div className="flex items-center gap-1"><b>Tags:</b> <Tags items={selectedTask.tags} /></div>
                </div>

                <div className="text-[12px]">

                    {(selectedTask?.history?.length ?? 0) > 0 && (
                        <div className="mt-3">
                            <p className="font-semibold text-[14px] text-[#000] flex items-center gap-1 "><MdHistory size={20} />History</p>

                            <div className="text-[12px] space-y-1 mt-1 border p-2 rounded border-gray-300 bg-gray-50">
                                {selectedTask?.history?.map((h: any, i: number) => (
                                    <div key={i} className="flex items-start gap-4">

                                        <div className="flex flex-col items-center">
                                            <div className="w-3 h-3 rounded-full bg-violet-600 z-10"></div>
                                            {selectedTask?.history && i < selectedTask.history.length - 1 && (
                                                <div className="w-0.5 h-12 bg-violet-300"></div>
                                            )}
                                        </div>

                                        <div className="bg-violet-100 shadow-sm border border-violet-300 rounded-lg px-2 py-1 w-full">
                                            <p className="text-xs  text-gray-800">
                                                {h.from} → <span className="text-violet-600">{h.to}</span>
                                            </p>

                                            <p className="text-[10px] text-[#222] mt-1">
                                                {new Date(h.movedAt).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
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