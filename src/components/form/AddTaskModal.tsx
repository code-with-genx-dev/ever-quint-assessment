import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import Button from "../UI/Button";
import { taskSchema } from "../../schema/zodFormValidation";
import { useTaskStore, type PriorityType, type StatusType } from "../../store/useTaskStore";
import Sidebar from "../UI/Sidebar";
import { IoMdClose } from "react-icons/io";
import { useToastStore } from "../../store/useToastStore";

const AddTaskModal = () => {
    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "" as StatusType,
        priority: "" as PriorityType,
        assignee: "",
        tags: "",
    });
    const [errors, setErrors] = useState<any>();
    const { addTask, setTaskModalOpen, taskModalOpen, editTask, updateTask, setEditTask } = useTaskStore();
    const { showToast } = useToastStore();

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
            id: editTask ? editTask.id : Date.now(),
            tags: form.tags.split(","),
            createdAt: editTask ? editTask.createdAt : new Date(),
            updatedAt: new Date(),
        };

        if (editTask) {
            updateTask(finalData);
            showToast("Task updated successfully");
        } else {
            addTask(finalData);
            showToast("Task added successfully");
        }
        setEditTask(null);
        setTaskModalOpen(false);
        reset();
    };

    console.log(editTask, "Edit Task")

    useEffect(() => {
        if (editTask) {
            setForm({
                title: editTask.title || "",
                description: editTask.description || "",
                status: editTask.status,
                priority: editTask.priority,
                assignee: editTask.assignee || "",
                tags: editTask.tags.join(", "),
            });
        }
    }, [editTask]);

    useEffect(() => {
        if (!taskModalOpen) {
            reset();
        }
    }, [taskModalOpen]);

    return (
        <Sidebar onHide={() => (setTaskModalOpen(false), reset(), setEditTask(null))} visible={taskModalOpen} customHeader={true}
            header={
                <div role="heading" aria-level={2} className="shrink-0 flex justify-between items-center px-4 py-3 border-b text-white bg-violet-600">
                    <h3 className="font-semibold text-[15px]">{editTask ? "Edit Task" : "Add Task"}</h3>
                    <button aria-label="Close modal" onClick={() => { setTaskModalOpen(false), setErrors(null), reset(), setEditTask(null) }} className="cursor-pointer p-1 rounded hover:bg-violet-700 transition-colors">
                        <IoMdClose size={18} />
                    </button>
                </div>
            }>
            <div className="bg-white rounded-lg w-full animate-pop space-y-1">

                <div role="dialog" aria-modal="true" aria-labelledby="add-task-title">
                    <label htmlFor="title" className="text-[14px] text-[#222]">Title <span className="text-[10px] text-red-500">*</span></label>
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
                    <label htmlFor="description" className="text-[14px] text-[#222]">Description</label>
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
                    <label htmlFor="status" className="text-[14px] text-[#222]">Status <span className="text-[10px] text-red-500">*</span></label>
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
                    <label htmlFor="priority" className="text-[14px] text-[#222]">Priority <span className="text-[10px] text-red-500">*</span></label>
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
                    <label htmlFor="assignee" className="text-[14px] text-[#222]">Assignee <span className="text-[10px] text-red-500">*</span></label>
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
                    <label htmlFor="tags" className="text-[14px] text-[#222]">Tags <span className="text-[10px] text-red-500">*</span></label>
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
                    <Button name="Cancel" variant="secondary" onClick={() => { setTaskModalOpen(false), setErrors(null), reset(), setEditTask(null) }} />
                    <Button name={editTask ? "Update Task" : "Add Task"} variant="primary" onClick={handleSubmit} />
                </div>

            </div>
        </Sidebar>
    );
};

export default AddTaskModal;