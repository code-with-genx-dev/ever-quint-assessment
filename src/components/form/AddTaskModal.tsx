import { useState } from "react";
import Dropdown from "./Dropdown";
import Button from "../UI/Button";
import { taskSchema } from "../../schema/zodFormValidation";
import { useTaskStore, type PriorityType, type StatusType } from "../../store/useTaskStore";
import Sidebar from "../UI/Sidebar";
import { IoMdClose } from "react-icons/io";

const AddTaskModal = ({ setTaskModalOpen, taskModalOpen }: any) => {
    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "" as StatusType,
        priority: "" as PriorityType,
        assignee: "",
        tags: "",
    });
    const [errors, setErrors] = useState<any>();
    const { addTask } = useTaskStore();

    const handleChange = (key: string, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        setErrors((prev: any) => ({ ...prev, [key]: "" }));
    };

    function reset() {
        return setForm({
            title: "",
            description: "",
            status: "" as StatusType,
            priority: "" as PriorityType,
            assignee: "",
            tags: "",
        })
    }

    const handleSubmit = () => {

        const result = taskSchema.safeParse(form);

        if (!result.success) {
            const fieldErrors: any = {};
            result.error.issues.forEach((err: any) => {
                fieldErrors[err.path[0]] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }
        const finalData = {
            ...form,
            id: Date.now(),
            tags: form.tags.split(","),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        addTask(finalData);
        setTaskModalOpen(false);
        setErrors(null);
        reset()
    };

    return (
        <Sidebar onHide={() => (setTaskModalOpen(false), reset())} visible={taskModalOpen} customHeader={true}
            header={
                <div className="shrink-0 flex justify-between items-center px-4 py-3 border-b text-white bg-violet-600">
                    <h3 className="font-semibold text-[15px]">Add Task</h3>
                    <button onClick={() => { setTaskModalOpen(false), setErrors(null), reset() }} className="cursor-pointer p-1 rounded hover:bg-violet-700 transition-colors">
                        <IoMdClose size={18} />
                    </button>
                </div>
            }>
            <div className="bg-white rounded-lg w-full animate-pop space-y-1">
                <h2 className="text-[16px] font-semibold text-[#222]">Add Task</h2>
                {/* Title */}
                <div>
                    <label htmlFor="" className="text-[14px] text-[#222]">Title <span className="text-[10px] text-red-500">*</span></label>
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full border px-2 py-1 text-[14px] rounded-md focus:outline-0 text-[#222] border-violet-500"
                        value={form.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                    />
                    {errors?.title && (
                        <p className="text-red-500 text-[10px]">{errors?.title}</p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="" className="text-[14px] text-[#222]">Description</label>
                    <textarea
                        style={{ resize: "none" }}
                        placeholder="Description"
                        className="w-full border px-2 py-1 text-[14px] rounded-md focus:outline-0 text-[#222] border-violet-500"
                        value={form.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                    />
                </div>

                {/* Status */}
                <div>
                    <label htmlFor="" className="text-[14px] text-[#222]">Status <span className="text-[10px] text-red-500">*</span></label>
                    <Dropdown
                        options={["Backlog", "In Progress", "Done"]}
                        value={form.status}
                        onChange={(val) => handleChange("status", val)}
                    />
                    {errors?.status && (
                        <p className="text-red-500 text-[10px]">{errors?.status}</p>
                    )}
                </div>

                {/* Priority */}
                <div>
                    <label htmlFor="" className="text-[14px] text-[#222]">Priority <span className="text-[10px] text-red-500">*</span></label>
                    <Dropdown
                        options={["Low", "Medium", "High"]}
                        value={form.priority}
                        onChange={(val) => handleChange("priority", val)}
                    />
                    {errors?.priority && (
                        <p className="text-red-500 text-[10px]">{errors?.priority}</p>
                    )}
                </div>

                {/* Assignee */}
                <div>
                    <label htmlFor="" className="text-[14px] text-[#222]">Assignee <span className="text-[10px] text-red-500">*</span></label>
                    <input
                        type="text"
                        placeholder="Assignee"
                        className="w-full border px-2 py-1 text-[14px] rounded-md focus:outline-0 text-[#222] border-violet-500"
                        value={form.assignee}
                        onChange={(e) => handleChange("assignee", e.target.value)}
                    />
                    {errors?.assignee && (
                        <p className="text-red-500 text-[10px]">{errors?.assignee}</p>
                    )}
                </div>

                {/* Tags */}
                <div>
                    <label htmlFor="" className="text-[14px] text-[#222]">Tags <span className="text-[10px] text-red-500">*</span></label>
                    <input
                        type="text"
                        placeholder="Tags (comma separated)"
                        className="w-full border px-2 py-1 text-[14px] rounded-md focus:outline-0 text-[#222] border-violet-500"
                        value={form.tags}
                        onChange={(e) => handleChange("tags", e.target.value)}
                    />
                    {errors?.tags && (
                        <p className="text-red-500 text-[10px]">{errors?.tags}</p>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-2 pt-2">
                    <Button name="Cancel" variant="secondary" onClick={() => { setTaskModalOpen(false), setErrors(null), reset() }} />
                    <Button name="Add Task" variant="primary" onClick={handleSubmit} />
                </div>

            </div>
        </Sidebar>
    );
};

export default AddTaskModal;