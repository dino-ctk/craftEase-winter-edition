# CraftEase Low-Fidelity UX Prototype

## Goal

Build an interactive grayscale wireframe that validates CraftEase’s navigation, hierarchy, role separation, and four core flows without real authentication or saved data.

## Structure

- Public: Login and Register
- Platform user: Dashboard, Discover, Project Listing, Project Details, Tutorial, Submit Work, My Submissions, Feedback, Profile
- Store employee: Dashboard, Project Management, Create/Edit Project, Preview, Submissions, Review and Feedback
- Administrator: Dashboard, Users, Roles & Permissions, Content Management, Moderation
- Use a shared wireframe shell with clearly different navigation for each role

## Interactions

- Login offers demo entry for each role
- All main navigation and core flow actions link to their next screen
- Tutorial steps can be selected and marked complete
- Forms, uploads, likes/dislikes, publishing, grading, and moderation controls provide prototype feedback without persistence
- Use realistic DIY sample projects and submissions

## Visual Direction

- Strictly low fidelity: grayscale, basic typography, square/simple boxes, placeholder media, restrained borders, and no decorative polish
- Responsive layouts that preserve hierarchy on desktop and mobile

## Technical Details

- Implement as TanStack Router routes with shared React components and semantic design tokens
- Use in-memory interaction state only; no Cloud, database, or real authentication
- Add unique metadata for every content route
- Verify representative user, employee, and administrator flows in the browser

Before implementation, make these two adjustments:

1. Keep the Profile screen as a low-fidelity prototype screen only. Do not implement persistent profile data, avatar storage, preferences, or real account data.
2. Enforce prototype-level role separation in navigation:

- Platform users only see user navigation and user flows.
- Store employees only see employee navigation and employee flows.
- Administrators only see administrator navigation and administrator flows.

The role separation can be simulated with demo roles and does not require real authentication or persistence.

Everything else in the current plan looks good. Proceed with the low-fidelity implementation.