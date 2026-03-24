import { useState } from "react"
import Button from "../components/UI/Button"
import MultiSelectDropdown from "../components/UI/MultiSelectDropdown"
import SearchFilter from "../components/UI/SearchFilter"
import MainLayout from "../layout/MainLayout"
import AddTaskModal from "../components/form/AddTaskModal"
import Board from "../components/workflow/Board"
import { useTaskStore } from "../store/useTaskStore"
import TaskDetailsModal from "../components/workflow/TaskViewModal"
import Sidebar from "../components/UI/Sidebar"
import TaskViewModal from "../components/workflow/TaskViewModal"


const Home = () => {
    const [taskModalOpen, setTaskModalOpen] = useState<boolean>(false);
    const { setSearch, setFilters } = useTaskStore();
    return (
        <MainLayout>
            {/* Filter Section */}
            <div className="flex items-center justify-between">
                <p className="text-[16px] font-bold text-[#222]">Tasks</p>
                <div className="flex items-center gap-4">
                    <SearchFilter onSearch={(val) => setSearch(val)} />
                    <MultiSelectDropdown
                        options={["Backlog", "In Progress", "Done"]}
                        onChange={(val) => setFilters(val)}
                    />
                    <Button name="Add Task" onClick={() => setTaskModalOpen(!taskModalOpen)} />
                </div>
            </div>
            <div>
                <Board />
            </div>

            {/* Task Sidebar Open */}
            <AddTaskModal setTaskModalOpen={setTaskModalOpen} taskModalOpen={taskModalOpen} />
            <TaskViewModal />
        </MainLayout>
    )
}

export default Home