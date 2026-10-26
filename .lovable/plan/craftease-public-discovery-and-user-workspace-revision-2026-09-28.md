# CraftEase Public Discovery and User Workspace Revision

## Goal

Reorganize only the public and platform-user experience so project discovery is the public homepage and the signed-in dashboard becomes a personal workspace. Preserve the existing low-fidelity style and leave employee and administrator flows unchanged.

## Public Experience

- Replace the current root login screen with a content-heavy Discover homepage.
- Add a global public header with CraftEase, search, category browsing, Login, and Register.
- Show featured projects, category shortcuts, and one searchable/filterable/sortable project grid with thumbnails, descriptions, difficulty, duration, likes, and author information.
- Move login to `/login`; keep registration at `/register`.
- Let visitors open a public project-details view and read the tutorial content without signing in.
- Show a simple login/register prompt when visitors try to like, dislike, save, start, or submit work.

## Authenticated Platform User Experience

- After demo login, send platform users to their personal dashboard.
- Update user navigation to: Discover / Home, My Dashboard, Saved / My Projects, My Submissions, Profile.
- Keep Discover linked to the same public homepage while representing a signed-in state with avatar, name, and account menu.
- Redesign Dashboard around active learning, recently viewed, saved, completed, submissions, and feedback.
- Add a Saved / My Projects screen and remove the duplicate Project Listing destination.
- Preserve tutorial, submission, feedback, and profile flows, updating return links where needed.

## Technical Details

- Reuse the shared prototype renderer and existing grayscale tokens/components.
- Add only the route files required for public login and public project details; do not change generated route files manually.
- Keep authentication and account state simulated in memory or route context; no persistence or Cloud services.
- Give each new public route unique page metadata.
- Verify public browsing, account-gated prompts, login-to-dashboard, signed-in discovery, and saved-project navigation on desktop and mobile.
