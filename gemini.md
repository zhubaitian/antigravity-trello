# Antigravity Trello Context

## Project Overview
A Trello-like Kanban board application built with Vue 3, designed to be fast, responsive, and aesthetically pleasing.

## Tech Stack
- **Core**: Vue 3 (Composition API, `<script setup>`)
- **Build Tool**: Vite
- **Language**: TypeScript
- **State Management**: Pinia (with `useStorage` for persistence)
- **Styling**: Tailwind CSS (v3) + Less
- **Drag & Drop**: `vuedraggable` (v4.x)
- **Icons**: `lucide-vue-next`

## Project Structure
```text
src/
├── components/
│   └── board/
│       ├── BoardCanvas.vue    # Main horizontal board area
│       ├── TrelloList.vue     # Vertical list column
│       └── TrelloCard.vue     # Individual draggable card
├── stores/
│   └── board.ts               # Pinia store for Board/List/Card data
├── App.vue                    # Main application layout
└── main.ts                    # App entry point
```

## Data Model (Pinia Store)
The `board` store manages the state:
- **Board**: Contains a list of `List` objects.
- **List**: Contains a title and an array of `Card` objects.
- **Card**: Contains title, description, and labels.

## Key Implementation Details
- **Drag and Drop**: 
  - Uses `vuedraggable` component.
  - Lists is a draggable group named 'lists'.
  - Cards is a draggable group named 'cards'.
- **Styling**:
  - Uses Tailwind CSS for layout and utilities.
  - Uses `less` blocks in components for specific styling needs.
  - Implements a "Glassmorphism" look with semi-transparent backgrounds and back-drop blur.

## Commands
- `npm run dev`: Start local development server.
- `npm run build`: Type-check and build for production.
