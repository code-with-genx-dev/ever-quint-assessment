import { useState } from "react";
import Dropdown from "./Dropdown";
import Button from "../UI/Button";

const AddTaskModal = ({ setTaskModalOpen }: any) => {
    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "",
        priority: "",
        assignee: "",
        tags: "",
    });

    const handleChange = (key: string, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        const finalData = {
            ...form,
            id: Date.now(),
            tags: form.tags.split(","),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        console.log("Task Data:", finalData);
        setTaskModalOpen(false)
    };

    return (
        <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50 backdrop-blur-sm">

            <div className="bg-white p-5 rounded-lg w-100 animate-pop space-y-3">

                <h2 className="text-[16px] font-semibold">Add Task</h2>

                {/* Title */}
                <input
                    type="text"
                    placeholder="Title"
                    className="w-full border px-2 py-1 text-[14px] rounded-md focus:outline-0 text-[#222] border-violet-400"
                    value={form.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                />

                {/* Description */}
                <textarea
                    style={{ resize: "none" }}
                    placeholder="Description"
                    className="w-full border px-2 py-1 text-[14px] rounded-md focus:outline-0 text-[#222] border-violet-400"
                    value={form.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                />

                {/* Status */}
                <Dropdown
                    options={["Backlog", "In Progress", "Done"]}
                    value={form.status}
                    onChange={(val) => handleChange("status", val)}
                />

                {/* Priority */}
                <Dropdown
                    options={["Low", "Medium", "High"]}
                    value={form.priority}
                    onChange={(val) => handleChange("priority", val)}
                />

                {/* Assignee */}
                <input
                    type="text"
                    placeholder="Assignee"
                    className="w-full border px-2 py-1 text-[14px] rounded-md focus:outline-0 text-[#222] border-violet-400"
                    value={form.assignee}
                    onChange={(e) => handleChange("assignee", e.target.value)}
                />

                {/* Tags */}
                <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    className="w-full border px-2 py-1 text-[14px] rounded-md focus:outline-0 text-[#222] border-violet-400"
                    value={form.tags}
                    onChange={(e) => handleChange("tags", e.target.value)}
                />

                {/* Buttons */}
                <div className="flex justify-end gap-2 pt-2">
                    <Button name="Cancel" variant="secondary" onClick={() => setTaskModalOpen(false)} />
                    <Button name="Add Task" variant="primary" onClick={handleSubmit} />
                </div>

            </div>
        </div>
    );
};

export default AddTaskModal;