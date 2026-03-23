import { useState } from "react"
import Button from "../components/UI/Button"
import MultiSelectDropdown from "../components/UI/MultiSelectDropdown"
import SearchFilter from "../components/UI/SearchFilter"
import MainLayout from "../layout/MainLayout"
import AddTaskModal from "../components/form/AddTaskModal"


const Home = () => {
    const [taskModalOpen, setTaskModalOpen] = useState<boolean>(false);
    return (
        <MainLayout>
            {/* Filter Section */}
            <div className="flex items-center justify-between">
                <p className="text-[16px] font-bold">Tasks</p>
                <div className="flex items-center gap-4">
                    <SearchFilter onSearch={(val) => console.log("Search:", val)} />
                    <MultiSelectDropdown
                        options={["All", "Active", "Completed"]}
                        onChange={(selected) => console.log(selected)}
                    />
                    <Button name="Add Task" onClick={() => setTaskModalOpen(!taskModalOpen)} />
                </div>
            </div>

            {/* Task Modal Open */}
            {taskModalOpen && <AddTaskModal setTaskModalOpen={setTaskModalOpen} taskModalOpen={taskModalOpen}/>}
        </MainLayout>
    )
}

export default Home