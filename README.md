# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# 🧩 Workflow Task Board (Kanban App)

A simple and interactive task management board built using **React**, **Zustand**, and **dnd-kit**.  
Users can create, edit, drag-and-drop, and filter tasks across different stages.

---

## 🚀 How to Run the Project

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd <project-folder>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the app
```bash
npm run dev
```

### 4. Open in browser
```
http://localhost:5173
```

---

## 🏗️ Architecture Overview

### 📁 Folder Structure

```
src/
│
├── components/
│   ├── UI/              → Reusable UI components (Button, Sidebar, Tags)
│   ├── form/            → Forms (Add/Edit Task Modal)
│   └── workflow/        → Board, Column, TaskCard
│
├── store/
│   └── useTaskStore.ts  → Zustand global state
│
├── pages/
│   └── Home.tsx         → Main screen
│
└── schema/
    └── zodValidation    → Form validation
```

---

## ⚙️ Key Design Decisions

### 🧠 State Management → Zustand

- Chosen for simplicity and minimal boilerplate
- Avoids prop drilling across deeply nested components
- Handles: tasks data, edit state, modal visibility, filters & search

### 🧩 Component Design

| Component | Responsibility |
|-----------|---------------|
| `TaskCard` | Small, reusable, focused UI |
| `Column` | Responsible only for grouping tasks |
| `Board` | Handles drag-and-drop logic |
| `Modal (Add/Edit)` | Single component reused for both create & edit |

This keeps components **reusable**, **easy to test**, and **easy to maintain**.

### 🔄 Data Layer

- Stored using Zustand with `persist`
- localStorage used for persistence
- Each task includes:
  - Metadata (`createdAt`, `updatedAt`)
  - History tracking (drag movement)

---

## 🧩 Component Hierarchy

```
Home
 ├── Header (Search + Filter + Add Button)
 ├── Board
 │    ├── Column (Backlog)
 │    │     └── TaskCard
 │    ├── Column (In Progress)
 │    │     └── TaskCard
 │    └── Column (Done)
 │          └── TaskCard
 │
 ├── AddTaskModal (Create/Edit)
 └── TaskViewModal (Details)
```

---

## 💾 Storage Versioning / Migration

Currently using Zustand `persist` with localStorage. No versioning implemented yet.

**Future improvement:**

```ts
persist(
  (set) => ({ ... }),
  {
    name: "task-storage",
    version: 1,
    migrate: (state, version) => {
      if (version === 0) {
        return {
          ...state,
          tasks: state.tasks.map(t => ({
            ...t,
            priority: t.priority || "Low"
          }))
        };
      }
      return state;
    }
  }
)
```


---


## ⚠️ Known Limitations

| Limitation | Detail |
|------------|--------|
| No backend | Data stored only in localStorage |
| No real-time sync | Multi-user not supported |
| Basic validation | Can be extended with Zod |
| Drag-and-drop | Not optimized for very large datasets |
| No pagination | No virtualization implemented |

---



## ✨ Future Improvements

- [ ] Backend integration (Node / NestJS)
- [ ] Real-time updates (WebSockets)
- [ ] Role-based access control
- [ ] Drag animation polish
- [ ] Mobile responsiveness improvements

---

## 💡 Summary

This project focuses on:

- ✅ Clean component architecture
- ✅ Efficient state management with Zustand
- ✅ Good UX practices
- ✅ Scalable design patterns
