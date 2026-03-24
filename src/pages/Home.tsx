
import Button from "../components/UI/Button"
import MultiSelectDropdown from "../components/UI/MultiSelectDropdown"
import SearchFilter from "../components/UI/SearchFilter"
import MainLayout from "../layout/MainLayout"
import AddTaskModal from "../components/form/AddTaskModal"
import Board from "../components/workflow/Board"
import { useTaskStore } from "../store/useTaskStore"
import TaskViewModal from "../components/workflow/TaskViewModal"


const Home = () => {
    const { setSearch, setFilters, setTaskModalOpen, setEditTask, setIsPopupOpen,reset,isPopupOpen } = useTaskStore();
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
                    <Button name="Add Task" onClick={() => { setTaskModalOpen(true), setEditTask(null); }} />
                </div>
            </div>

            {/* Board Section */}
            <Board />

            {/* Task Sidebar Open */}
            <AddTaskModal />

            {/* Task details sidebar */}
            <TaskViewModal />

            {/* Reset popup */}
            <div className="fixed inset-0 bg-black/20 bg-opacity-50 text-[#222]! flex items-center justify-center z-50" style={{ display: isPopupOpen ? "flex" : "none" }}>
                <div className="bg-white p-6 rounded-lg">
                    <h2 className="text-[18px] font-bold mb-4">Reset Tasks</h2>
                    <p className="mb-4 text-[14px]">Reset all tasks?This will remove your current tasks and restore the default list.</p>
                    <div className="flex justify-end gap-4">
                        <Button name="Cancel" onClick={() => setIsPopupOpen(false)} />
                        <Button name="Reset" onClick={() => { reset(); setIsPopupOpen(false); }} />
                    </div>
                </div>
            </div>

        </MainLayout>
    )
}

export default Home