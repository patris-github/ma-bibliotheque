# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Ma Bibliothèque** is a personal book management web application for tracking reading lists. Users can catalog books with their reading status (À lire, En cours, Lu).

**Current Status:** Phase 3 (Planning) COMPLETE - Ready for Phase 4 (Implementation)

## Tech Stack

- **Frontend**: React 18 + Vite 5.x + TypeScript 5.x
- **Routing**: React Router 7.x
- **State**: TanStack Query (server state + cache)
- **UI**: Shadcn/ui + TweakCN (néo-brutaliste theme)
- **Forms**: React Hook Form + Zod
- **Backend**: Supabase (Auth + PostgreSQL)
- **Deployment**: Vercel

### Supabase Constraints

- No Edge Functions - all logic is client-side
- No Storage - no image uploads
- No Realtime - no live synchronization

## Data Model

The `livres` table contains:
- `id` (UUID) - primary key
- `user_id` (UUID) - references auth.users
- `titre` (String) - required
- `auteur` (String) - required
- `statut` (Enum) - "a_lire" | "en_cours" | "lu"
- `created_at`, `updated_at` (Timestamp)

## Critical Implementation Rules

### TypeScript & Data
- **ALWAYS** use TypeScript strict mode, **NEVER** use `any`
- Keep Supabase data in **snake_case** - DO NOT convert to camelCase
- Generate types with Supabase CLI into `types/database.ts`

### State Management
- **ALWAYS** use TanStack Query for Supabase data
- **NEVER** use `useState` + `useEffect` for fetching
- Query keys: `['livres']` for list, `['livre', id]` for item
- **ALWAYS** invalidate cache after mutations

### Components & Structure
- Components: **PascalCase** (`BookCard.tsx`)
- Hooks: **camelCase** with `use` prefix (`useBooks.ts`)
- One component per file
- UI in `components/`, business logic in `features/`

### Forms & Validation
- **ALWAYS** use React Hook Form + Zod
- Error messages in **French**
- Display validation errors inline under fields

### Error & Loading States
- API errors → Toast (Sonner)
- Validation errors → Inline
- Loading → Skeleton components

```typescript
// Standard pattern
if (isLoading) return <Skeleton />
if (error) return <ErrorState />
return <Content data={data} />
```

## Project Structure

```
src/
├── components/ui/     # Shadcn/ui components only
├── components/        # Shared custom components (BookCard, FAB, etc.)
├── features/auth/     # Auth: context, hooks, forms
├── features/books/    # Books: hooks, forms, list, schema
├── lib/               # supabase.ts, queryClient.ts, utils.ts
├── pages/             # Page components
└── types/             # TypeScript types
```

## Project Documentation

| Document | Purpose |
|----------|---------|
| `docs/prd/` | Product Requirements Document (10 sections) |
| `docs/architecture.md` | Architecture decisions, patterns, structure |
| `docs/ux-design-specification.md` | UX patterns, colors, typography |
| `docs/epics.md` | Epic & story breakdown (11 stories) |
| `docs/project_context.md` | Critical rules for AI agents |

## Epic Structure

### Epic 1: User Access & Authentication (6 stories)
- Story 1.1: Project initialization with tech stack
- Story 1.2: Supabase configuration & database
- Story 1.3: User registration
- Story 1.4: User login
- Story 1.5: Session management & logout
- Story 1.6: Homepage with empty state

### Epic 2: Book Collection Management (5 stories)
- Story 2.1: Book list display
- Story 2.2: Add book
- Story 2.3: Edit book
- Story 2.4: Delete book
- Story 2.5: Filter by status

## BMAD Method Integration

This project uses the BMAD Method v6 for AI-driven development. The `.bmad/` folder contains agents and workflows.

### Key BMAD Commands (Slash Commands)

| Command | Purpose |
|---------|---------|
| `/bmad:bmm:workflows:workflow-status` | Check current workflow status |
| `/bmad:bmm:workflows:sprint-planning` | Initialize sprint with stories |
| `/bmad:bmm:workflows:sprint-status` | View sprint progress |
| `/bmad:bmm:workflows:dev-story` | Implement a story |
| `/bmad:bmm:workflows:create-story` | Create next story from epic |
| `/bmad:bmm:workflows:code-review` | Run adversarial code review |
| `/bmad:bmm:workflows:quick-dev` | Flexible dev from tech-specs or instructions |

### BMAD Agents

- **SM (Scrum Master)** - Sprint planning, story creation, retrospectives
- **DEV** - Implementation, code review
- **PM** - PRD and requirements
- **Architect** - System architecture decisions
- **TEA** - Test Engineer Architect

### BMAD Workflow

1. Use fresh chats for each workflow to avoid context issues
2. Load appropriate agent before running workflows
3. Status files (`bmm-workflow-status.yaml`, `sprint-status.yaml`) track progress

## Core Features (Fixed Scope)

1. View book list with title, author, status
2. Add books with title, author, reading status
3. Edit existing books
4. Delete books with confirmation
5. Filter by reading status (Bottom Navigation)

## UX Design Notes

- **Style**: Néo-brutaliste with hard shadows (3px offset, 0 blur)
- **Typography**: Lora (book titles), Poppins (interface)
- **Status Colors**: Rose (À lire), Jaune (En cours), Bleu-vert (Lu)
- **Navigation**: Bottom Navigation with 4 tabs (Tous | À lire | En cours | Lu)
- **Primary Action**: FAB (Floating Action Button) for quick add
- **Mobile-first**: Touch targets 44px minimum

## Explicitly Out of Scope

- External API book search (Google Books, Open Library)
- Cover images
- Multi-user sharing
- Detailed notes/reviews
- Barcode/ISBN scanning
- Book categories/genres
- Lending system
- Recommendations
