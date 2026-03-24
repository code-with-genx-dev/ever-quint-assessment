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

    addTask: (task: Task) => void;
    moveTask: (id: number, status: Task["status"]) => void;
    setSearch: (val: string) => void;
    setFilters: (val: string[]) => void;
    reset: () => void;
    setSelectedTask: (task: Task | null) => void;
}

const initialTasks: Task[] = [
    {
        id: 1,
        title: "Design Dashboard",
        description: "UI work",
        status: "Backlog",
        priority: "High",
        assignee: "Visva",
        tags: ["UI","Frontend"],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        title: "API Integration",
        description: "Connect backend",
        status: "In Progress",
        priority: "Medium",
        assignee: "Team",
        tags: ["API"],
        createdAt: new Date(),
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

            addTask: (task) =>
                set((state) => ({
                    tasks: [...state.tasks, task],
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

            setSearch: (val) => set({ search: val }),
            setFilters: (val) => set({ filters: val }),
            setSelectedTask: (task) =>
                set({
                    selectedTask: task ? JSON.parse(JSON.stringify(task)) : null,
                }),
            reset: () => set({ tasks: initialTasks }),
        }),
        {
            name: "task-storage",
        }
    )
);