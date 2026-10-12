# hand reviewer notes

## Architecture
This is a Vite React 19 + TypeScript dashboard application, with client-side routing handled centrally in `src/App.tsx`. Pages compose reusable dashboard, profile, table, and UI components under `src/components`; charts use Recharts, icons use `lucide-react`, and styling combines Tailwind utilities with project CSS classes. Authentication and profile/theme state are lightweight browser-side concerns rather than a visible backend integration.

## Conventions
- Use functional React components and explicit TypeScript props. Examples include `Navbar` in `src/components/dashboard/Navbar.tsx`, `PeopleTable` in `src/components/tables/PeopleTable.tsx`, and the exported `ProfileValues` type in `src/components/profile/ProfileForm.tsx`.
- Components are grouped by feature (`dashboard`, `profile`, `tables`) with shared primitives under `src/components/ui`; reusable cards are consistently composed through `Card`, e.g. `MetricCards.tsx`, `SalesChart.tsx`, and `ProfileCard.tsx`.
- Most feature components use named exports (`AnalyticsCharts`, `MetricCards`, `Sidebar`), while page modules imported by `src/App.tsx` use default exports. Preserve the existing export style of the file being changed.
- Route protection is implemented as a wrapper route: `ProtectedRoutes` in `src/App.tsx` renders an `Outlet` only when `isAuthenticated()` succeeds, redirecting unauthenticated users to `/login`.
- Static display data is colocated with its component as typed/inferred constants, such as `lineData` and `pieData` in `AnalyticsCharts.tsx`, `salesData` in `SalesChart.tsx`, and `people` in `PeopleTable.tsx`.
- The `@/*` alias maps to `src/*` in `tsconfig.json` and `vite.config.ts`, though the sampled source primarily uses relative imports.
- Browser persistence and cross-component refresh use explicit browser APIs: theme state uses `localStorage` in `Navbar.tsx`, and profile updates are observed through the `dashboard-user-updated` window event.

## Intentional non-standard choices
- The dashboard is currently presentation-oriented: charts, metrics, tasks, and table rows are hardcoded in their component files rather than fetched from an API (`src/components/dashboard/*.tsx`, `src/components/tables/PeopleTable.tsx`).
- Styling intentionally mixes utility classes (for example, `Navbar.tsx`) with semantic project classes such as `topbar`, `metric-card`, and `people-table`; do not require a single styling system.

## Watch out for
- Check route casing carefully. `src/App.tsx` registers `/Orders`, while `src/components/dashboard/Sidebar.tsx` links to `/orders`; this can make the Orders navigation fail under case-sensitive routing.
- Flag controls that appear interactive but have no behavior: the mobile menu button in `Navbar.tsx` has no click handler, and task checkbox/edit/delete buttons in `Tasks.tsx` do not update state.
- In `ProfileForm.tsx`, the field labeled `"Company (disabled)"` does not pass `disabled` to `Field`; verify whether this is an accidental omission.
- Preserve accessibility attributes when changing menus and icon-only controls; existing patterns include `aria-label`, `aria-expanded`, `role="menu"`, and `aria-hidden` in `Navbar.tsx`.
- When changing authentication or logout behavior, account for both `ProtectedRoutes` in `App.tsx` and the browser-side helpers used by `Navbar.tsx`; redirects should use React Router navigation rather than direct location mutation.