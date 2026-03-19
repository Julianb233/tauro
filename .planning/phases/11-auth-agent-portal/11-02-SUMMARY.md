# Plan 11-02: Dashboard Shell — SUMMARY

**Status:** COMPLETE

## What Was Built

### Dashboard Layout (`src/app/dashboard/layout.tsx`)
- Server component that calls `getUserProfile()` for current user
- Redirects to `/login` if no profile found
- Wraps children in `DashboardShell` with user data

### Dashboard Shell (`src/components/dashboard/dashboard-shell.tsx`)
- Client component managing sidebar open/close state
- Flex layout: sidebar + main content area
- Passes pathname and user role to sidebar, user data to header

### Sidebar (`src/components/dashboard/sidebar.tsx`)
- 5 navigation items: Overview, Leads, Properties, Agents (admin only), Calendar
- Active state with gold left border and gold text
- Mobile: full-screen overlay with backdrop, toggled via hamburger
- Desktop: fixed 240px sidebar
- Tauro logo linking to public site, "Agent Portal" label
- "Back to site" link at bottom

### Header (`src/components/dashboard/header.tsx`)
- Mobile hamburger menu toggle
- User avatar (initials or photo) with dropdown menu
- Dropdown shows name, email, role badge (admin=gold, agent=blue, viewer=gray)
- Working logout button that calls `signOut()` and redirects to `/login`
- Outside-click detection to close dropdown

### Dashboard Overview (`src/app/dashboard/page.tsx`)
- Server component fetching real stats from database
- Welcome greeting with user's first name
- 4 stat cards: Leads This Month, Active Listings, Showings Scheduled, New Leads
- Recent Leads section showing last 5 leads with type/status badges
- Graceful handling when Supabase not configured (shows 0 values)

### Stat Card (`src/components/dashboard/stat-card.tsx`)
- Reusable stat display with icon, value, title, optional change indicator
- Optional link wrapper, hover effects

## Files
- `src/app/dashboard/layout.tsx`
- `src/app/dashboard/page.tsx`
- `src/components/dashboard/dashboard-shell.tsx`
- `src/components/dashboard/sidebar.tsx`
- `src/components/dashboard/header.tsx`
- `src/components/dashboard/stat-card.tsx`
