import { DndContext } from "@dnd-kit/core";
import { useTaskStore } from "../../store/useTaskStore";
import Column from "./Coulmn";


const Board = () => {
  const { tasks, moveTask, search, filters } = useTaskStore();

  const columns = ["Backlog", "In Progress", "Done"];

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filters.length === 0 || filters.includes(task.status);

    return matchesSearch && matchesFilter;
  });

  return (
    <DndContext
      onDragEnd={(event) => {
        const { active, over } = event;
        if (!over) return;

        moveTask(Number(active.id), over.id as any);
      }}
    >
      <div className="grid grid-cols-3 gap-4 mt-4">
        {columns.map((col) => (
          <Column
            key={col}
            title={col}
            tasks={filteredTasks.filter((t) => t.status === col)}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default Board;