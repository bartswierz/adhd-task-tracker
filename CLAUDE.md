# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ADHD Task Tracker is a React 19 frontend application built with Vite, TypeScript 6, Tailwind CSS, and Shadcn UI. The React Compiler is enabled. The application helps users with ADHD complete tasks by keeping things organized and rewarding progress with a point system to build motivation.

## Build, Test & Lint

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Type-check with TypeScript, then build with Vite
- `npm run lint` — Run ESLint across the project
- `npm run preview` — Preview production build locally

## Code Style

- TypeScript strict mode is enabled.
- Use explicit type annotations where appropriate.
- Use functional React components only.
- Keep components small and focused.
- Use Tailwind CSS utility classes instead of custom CSS whenever possible.
- Use Shadcn UI components before creating custom UI.
- Follow ESLint rules without disabling them unless approved.

## Patterns

- Functional components with hooks only.
- No class components.
- Co-locate component tests with the component they test.
- Use StrictMode during development.
- Prefer composition over inheritance.
- Keep business logic separate from presentation logic.

## ADHD Product Principles

Prioritize:

- Low cognitive load
- Minimal decision fatigue
- Clear visual hierarchy
- Small actionable steps
- Immediate feedback
- Positive reinforcement
- Consistent navigation

Design for users who become overwhelmed easily.

Every screen should answer:

- What should I do next?
- How much progress have I made?
- What reward am I working toward?

Avoid:

- Overwhelming dashboards
- Excessive configuration
- Complex multi-step workflows
- Hidden actions

## Folder Structure

Current structure:

src/
assets/
components/
ui/
lib/
App.tsx
index.css
main.tsx

As the application grows:

src/
assets/
components/
ui/
features/
pages/
hooks/
services/
store/
types/
lib/

Guidelines:

- Shadcn UI components belong in `src/components/ui/`.
- Shared utilities belong in `src/lib/`.
- Feature-specific code belongs in `src/features/`.
- Route-level pages belong in `src/pages/`.
- Do not create a root `@/` folder.
- The `@` alias maps to `src/`.
- Follow existing patterns.
- Do not create new top-level folders without approval.

## Architecture

- Keep components focused on presentation.
- Move business logic into hooks, services, or state management.
- Reuse existing components whenever possible.
- Favor composition over duplication.
- Design code so it can later support a backend without major rewrites.
- Use Shadcn UI components whenever possible.
- If a suitable Shadcn component does not exist, ask for approval before building a custom component.

## State Management

Use Redux Toolkit for global state.

Global State:

- Tasks
- Task completion status
- Points
- Rewards
- Streaks
- User preferences

Local Component State:

- Form inputs
- Dialog open/closed state
- Temporary UI state

Persist Redux state to localStorage through a centralized persistence layer.
Do not call localStorage directly throughout components.

## Redux Guidelines

Use Redux Toolkit.

Create feature-based slices.

Examples:

- taskSlice
- rewardSlice
- streakSlice
- settingsSlice

Use selectors instead of directly accessing state throughout components.

Keep reducers pure.

Avoid putting UI-only state in Redux unless it must be shared globally.

## Data Persistence

There is currently no backend.

Persist user data to localStorage:

- Tasks
- Task completion status
- Points
- Rewards
- Streaks
- User preferences

Design state management with future migration to a backend in mind, but do not implement backend infrastructure unless approved.

## TypeScript

- Avoid `any`.
- Avoid `unknown` unless necessary.
- Prefer interfaces for domain models and component props.
- Use strict typing.
- Type all component props.
- Type all Redux state and actions.

## UI Components

Use Shadcn UI components whenever possible.

Before creating a custom component:

1. Check Shadcn UI first.
2. Check existing project components.
3. Ask for approval before building from scratch.

Prefer using:

- Button
- Card
- Dialog
- Sheet
- Tabs
- Badge
- Progress
- Tooltip
- Input
- Textarea

## Package Management

- Never install packages without approval.
- Never modify package.json without approval.
- Prefer existing dependencies before introducing new ones.
- Explain why a new package is needed before suggesting it.

## Simplicity

Prefer the simplest solution that satisfies requirements.

Do not:

- Create abstractions prematurely.
- Build systems for hypothetical future features.
- Create reusable utilities unless used more than once.
- Introduce enterprise architecture patterns unnecessarily.

Optimize for readability, maintainability, and speed of development.

## Planning

Before implementing any feature:

1. Review existing files.
2. Explain the proposed solution.
3. List files to be created or modified.
4. Wait for approval before implementation.

Do not begin coding immediately.

## Planned Features

- Gentle affirmation reminders when the user has not completed a task in over 1 hour.
- This should be opt-in and configurable.
- Do not implement browser notifications in the first pass unless approved.
- Initial implementation can track `lastTaskCompletedAt` in Redux/localStorage.

## Planned Reminder Feature

The app may later include gentle affirmation reminders when the user has not completed a task in over 1 hour.

Requirements:

- The feature must be opt-in.
- Track `lastTaskCompletedAt`.
- Track `lastAffirmationShownAt`.
- Track whether affirmations are enabled.
- Avoid sending repeated reminders too frequently.
- Prefer in-app affirmation messages before browser notifications.
- Do not implement browser notification permissions unless specifically approved.

## Git Workflow

Before making code changes:

1. Explain the plan.
2. List files to be created or modified.
3. Wait for approval.

Before committing:

1. Summarize completed work.
2. Propose a commit message.
3. Wait for approval.

Do not push without approval.

## UI

- Mobile-first design.
- Accessible by default.
- Consistent spacing and typography.
- Prefer simple interfaces over feature-rich interfaces.
- Every screen should have a clear primary action.

## NEVER

- Introduce alternative libraries without approval.
- Use `any`.
- Remove existing functionality without approval.
- Install packages without approval.
- Modify package.json without approval.
- Create a root `@/` folder.
- Add useMemo, useCallback, or React.memo unless a specific performance issue has been identified.
- Assume future requirements and build for them prematurely.

Project uses React Compiler.

Assume React Compiler handles memoization unless profiling demonstrates otherwise.
