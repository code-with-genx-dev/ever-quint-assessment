import { create } from "zustand";
import { persist } from "zustand/middleware";

export type StatusType = "Backlog" | "In Progress" | "Done";
export type PriorityType = "Low" | "Medium" | "High";

export type TaskHistory = {
    from: string;
    to: string;
    movedAt: Date;
};

export type Task = {
    id: number;
    title: string;
    description?: string;
    status: "Backlog" | "In Progress" | "Done";
    priority: "Low" | "Medium" | "High";
    assignee: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    history?: TaskHistory[];
};

interface TaskState {
    tasks: Task[];
    search: string;
    filters: string[];
    selectedTask: Task | null;
    editTask: Task | null;
    taskModalOpen: boolean;
    isPopupOpen: boolean;

    addTask: (task: Task) => void;
    moveTask: (id: number, status: Task["status"]) => void;
    setSearch: (val: string) => void;
    setFilters: (val: string[]) => void;
    reset: () => void;
    setSelectedTask: (task: Task | null) => void;
    updateTask: (task: Task) => void;
    setEditTask: (task: Task | null) => void;
    setTaskModalOpen: (open: boolean) => void;
    setIsPopupOpen: (open: boolean) => void;
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Implement authentication flow",
    description: "Add login, signup, and JWT-based authentication",
    status: "In Progress",
    priority: "High",
    assignee: "Arun Kumar",
    tags: ["Auth", "Backend", "Security"],
    createdAt:new Date(),
    updatedAt: new Date(),
  },
  {
    id: 102,
    title: "Design dashboard layout",
    description: "Create responsive layout with sidebar and widgets",
    status: "Backlog",
    priority: "Medium",
    assignee: "Priya Sharma",
    tags: ["UI", "Design", "Frontend"],
    createdAt:new Date(),
    updatedAt: new Date(),
  },
  {
    id: 103,
    title: "Integrate task API",
    description: "Connect frontend with task management APIs",
    status: "In Progress",
    priority: "High",
    assignee: "Rahul Verma",
    tags: ["API", "Integration"],
    createdAt:new Date(),
    updatedAt: new Date(),
  },
  {
    id: 104,
    title: "Fix drag-and-drop issues",
    description: "Resolve bugs in board column reordering",
    status: "Done",
    priority: "Low",
    assignee: "Sneha Iyer",
    tags: ["Bug", "DnD", "UI"],
    createdAt:new Date(),
    updatedAt: new Date(),
  },
];

export const useTaskStore = create<TaskState>()(
    persist(
        (set) => ({
            tasks: initialTasks,
            search: "",
            filters: [],
            selectedTask: null,
            editTask: null,
            taskModalOpen: false,
            isPopupOpen: false,

            addTask: (task) => set((state) => ({
                tasks: [...state.tasks, task],
            })),
            updateTask: (updatedTask: Task) =>
                set((state) => ({
                    tasks: state.tasks.map((task) =>
                        task.id === updatedTask.id
                            ? {
                                ...updatedTask,
                                updatedAt: new Date(),
                            }
                            : task
                    ),
                })),
            moveTask: (id, newStatus) =>
                set((state) => ({
                    tasks: state.tasks.map((task) => {
                        if (task.id !== id) return task;

                        const historyEntry = {
                            from: task.status,
                            to: newStatus,
                            movedAt: new Date(),
                        };

                        return {
                            ...task,
                            status: newStatus,
                            updatedAt: new Date(),
                            history: [...(task.history || []), historyEntry],
                        };
                    }),
                })),
            setEditTask: (task) => set({ editTask: task }),
            setTaskModalOpen: (open) => set({ taskModalOpen: open }),
            setSearch: (val) => set({ search: val }),
            setFilters: (val) => set({ filters: val }),
            setSelectedTask: (task) => set({
                selectedTask: task ? JSON.parse(JSON.stringify(task)) : null,
            }),
            setIsPopupOpen: (open) => set({ isPopupOpen: open }),
            reset: () => set({ tasks: initialTasks }),
        }),
        {
            name: "task-storage",
        }
    )
);