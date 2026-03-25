# Workflow Task Board (Kanban App)

An interactive task management board built with **React**, **Zustand**, and **dnd-kit**. Create, edit, drag-and-drop, and filter tasks across different stages.

---

## Getting Started

```bash
# Clone the repo
git clone <your-repo-url>
cd <project-folder>

# Install dependencies
npm install

# Run the app
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Tech Stack

- **React** + **TypeScript** + **Vite**
- **Zustand** — global state management with `persist` (localStorage)
- **dnd-kit** — drag-and-drop functionality
- **Zod** — form validation

---

## Folder Structure

```
src/
├── components/
│   ├── UI/          # Reusable UI components (Button, Sidebar, Tags)
│   ├── form/        # Add/Edit Task Modal
│   └── workflow/    # Board, Column, TaskCard
├── store/
│   └── useTaskStore.ts   # Zustand global state
├── pages/
│   └── Home.tsx          # Main screen
└── schema/
    └── zodValidation      # Form validation schemas
```

---

## Component Hierarchy

```
Home
├── Header (Search + Filter + Add Button)
├── Board
│   ├── Column (Backlog)     → TaskCard
│   ├── Column (In Progress) → TaskCard
│   └── Column (Done)        → TaskCard
├── AddTaskModal (Create / Edit)
└── TaskViewModal (Task Details)
```

---

## State Management

Zustand is used for all global state:

- Task data (create, update, delete)
- Modal visibility and edit state
- Search and filter state
- Drag movement history per task

Tasks are persisted to **localStorage** via Zustand's `persist` middleware. Each task includes `createdAt`, `updatedAt`, and movement history.

---

## Known Limitations

- No backend — data is stored only in localStorage
- No real-time sync or multi-user support
- No pagination or virtualization for large datasets

---

## Planned Improvements

- [ ] Backend integration (Node.js / NestJS)
- [ ] Real-time updates via WebSockets
- [ ] Role-based access control
- [ ] Mobile responsiveness improvements
- [ ] Storage versioning and migration support
