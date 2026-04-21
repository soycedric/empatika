---
name: frontend-ui-engineering
description: Builds production-quality UIs. Use when building or modifying user-facing interfaces. Use when creating components, implementing layouts, managing state, or when the output needs to look and feel production-quality rather than AI-generated.
---

# Frontend UI Engineering

## Overview

Build production-quality user interfaces that are accessible, performant, and visually polished.

For this workspace, prioritize **Empátika's brutalist brand language** and implementation quality over generic UI conventions.

## Project Context (Empátika)

- Brand: tofu artesanal y veganesa para público vegano, fit y B2B.
- Goal: move from corporate-soft UI to a raw, industrial, label-inspired aesthetic.
- Stack: Vite + React + TypeScript + Tailwind + shadcn/ui.
- Core design tokens live in `src/index.css` and `tailwind.config.ts`.
- Main UI surfaces live in `src/components/` and `src/pages/`.

### Non-Negotiable Design Constraints

1. **No new fonts**. Only use existing local fonts already declared in project:
  - Display: `Gunplay` / `Gunplay3D`
  - Body: `CMU Typewriter Text`
2. **Tofitos are secondary**: use as subtle accent/easter egg, not as main visual hero.
3. **No glitch/neon/digital distortion effects**.
4. Prefer high-contrast cream/black palette, strong borders, and label-style composition.
5. Avoid soft corporate shadows and over-rounded visuals unless explicitly required by an existing component pattern.

## When to Use

- Building new UI components or pages
- Modifying existing user-facing interfaces
- Implementing responsive layouts
- Adding interactivity or state management
- Fixing visual or UX issues

Use this skill especially when touching:
- `src/components/HeroSection.tsx`
- `src/components/ProductCard.tsx`
- `src/components/ProductsSection.tsx`
- `src/components/RestaurantsSection.tsx` / Leaflet map UI
- `src/index.css`

## Component Architecture

### File Structure

Follow existing project structure and naming before introducing new patterns.

Typical locations in this repo:

```
src/components/
  ProductCard.tsx
  HeroSection.tsx
  calculator/
    ProductSelector.tsx
    OrderSummary.tsx
src/hooks/
  use-order-calculator.ts
src/services/
  order-validation.service.ts
```

### Component Patterns

**Prefer composition over configuration:**

```tsx
// Good: Composable
<Card>
  <CardHeader>
    <CardTitle>Tasks</CardTitle>
  </CardHeader>
  <CardBody>
    <TaskList tasks={tasks} />
  </CardBody>
</Card>

// Avoid: Over-configured
<Card
  title="Tasks"
  headerVariant="large"
  bodyPadding="md"
  content={<TaskList tasks={tasks} />}
/>
```

**Keep components focused:**

```tsx
// Good: Does one thing
export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className="flex items-center gap-3 p-3">
      <Checkbox checked={task.done} onChange={() => onToggle(task.id)} />
      <span className={task.done ? 'line-through text-muted' : ''}>{task.title}</span>
      <Button variant="ghost" size="sm" onClick={() => onDelete(task.id)}>
        <TrashIcon />
      </Button>
    </li>
  );
}
```

**Separate behavior from presentation when complexity grows:**

```tsx
// Container: handles data/logic
export function TaskListContainer() {
  const { tasks, isLoading, error } = useTasks();

  if (isLoading) return <TaskListSkeleton />;
  if (error) return <ErrorState message="Failed to load tasks" retry={refetch} />;
  if (tasks.length === 0) return <EmptyState message="No tasks yet" />;

  return <TaskList tasks={tasks} />;
}

// Presentation: handles rendering
export function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <ul role="list" className="divide-y">
      {tasks.map(task => <TaskItem key={task.id} task={task} />)}
    </ul>
  );
}
```

## State Management

**Choose the simplest approach that works:**

```
Local state (useState)           → Component-specific UI state
Lifted state                     → Shared between 2-3 sibling components
Context                          → Theme, auth, locale (read-heavy, write-rare)
URL state (searchParams)         → Filters, pagination, shareable UI state
Server state (React Query, SWR)  → Remote data with caching
Global store (Zustand, Redux)    → Complex client state shared app-wide
```

In this project, reuse existing context/hooks first (for example order flow logic) before adding global state.

## Design System Adherence

### Avoid the AI Aesthetic

AI-generated UI has recognizable patterns. Avoid all of them:

| AI Default | Why It Is a Problem | Empátika Quality |
|---|---|---|
| Purple/indigo everything | Breaks brand consistency | Use cream/ink/industrial tokens defined in project |
| Excessive gradients | Adds noise and looks generic | Prefer flat blocks and strong contrast |
| Rounded everything (rounded-2xl) | Feels soft/corporate | Keep square edges unless existing component demands otherwise |
| Generic hero sections | Ignores product-first messaging | Product and value proposition must dominate hero |
| Placeholder copy | Hides real content behavior | Use realistic Spanish copy related to tofu/veganesa/B2B |
| Oversized spacing everywhere | Weakens hierarchy | Use the project's spacing scale and density |
| Card-grid-for-everything | Ignores information priority | Build layouts that match business goals (venta, distribución, contacto) |
| Shadow-heavy design | Conflicts with label look | Prefer borders and structural contrast over soft shadow depth |

### Spacing and Layout

Use a consistent spacing scale. Don't invent values:

```css
/* Use the scale: 0.25rem increments (or whatever the project uses) */
/* Good */  padding: 1rem;      /* 16px */
/* Good */  gap: 0.75rem;       /* 12px */
/* Bad */   padding: 13px;      /* Not on any scale */
/* Bad */   margin-top: 2.3rem; /* Not on any scale */
```

### Typography

Respect the type hierarchy:

```
h1 → Page title (one per page)
h2 → Section title
h3 → Subsection title
body → Default text
small → Secondary/helper text
```

Don't skip heading levels. Don't use heading styles for non-heading content.

### Color

- Use semantic color tokens and existing CSS vars from `src/index.css`
- Ensure sufficient contrast (4.5:1 for normal text, 3:1 for large text)
- Don't rely solely on color to convey information (use icons, text, or patterns too)

### Product Card & Macro Labels (Empátika)

- Product cards should read like packaging labels: strong borders, compact hierarchy, direct copy.
- Nutrition/macro highlights should be visually assertive (high contrast, monospace body font).
- Keep CTA and key macros scannable on mobile first.

### Map Section (Leaflet)

- Keep map styling consistent with cream/black site palette.
- Tofito markers must be subtle and must not compete with core conversion actions.
- Maintain marker legibility and tap targets on mobile.

## Accessibility (WCAG 2.1 AA)

Every component must meet these standards:

### Keyboard Navigation

```tsx
// Every interactive element must be keyboard accessible
<button onClick={handleClick}>Click me</button>        // ✓ Focusable by default
<div onClick={handleClick}>Click me</div>               // ✗ Not focusable
<div role="button" tabIndex={0} onClick={handleClick}    // ✓ But prefer <button>
     onKeyDown={e => {
       if (e.key === 'Enter') handleClick();
       if (e.key === ' ') e.preventDefault();
     }}
     onKeyUp={e => {
       if (e.key === ' ') handleClick();
     }}>
  Click me
</div>
```

### ARIA Labels

```tsx
// Label interactive elements that lack visible text
<button aria-label="Close dialog"><XIcon /></button>

// Label form inputs
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// Or use aria-label when no visible label exists
<input aria-label="Search tasks" type="search" />
```

### Focus Management

```tsx
// Move focus when content changes
function Dialog({ isOpen, onClose }: DialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  // Trap focus inside dialog when open
  return (
    <dialog open={isOpen}>
      <button ref={closeRef} onClick={onClose}>Close</button>
      {/* dialog content */}
    </dialog>
  );
}
```

### Meaningful Empty and Error States

```tsx
// Don't show blank screens
function TaskList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return (
      <div role="status" className="text-center py-12">
        <TasksEmptyIcon className="mx-auto h-12 w-12 text-muted" />
        <h3 className="mt-2 text-sm font-medium">No tasks</h3>
        <p className="mt-1 text-sm text-muted">Get started by creating a new task.</p>
        <Button className="mt-4" onClick={onCreateTask}>Create Task</Button>
      </div>
    );
  }

  return <ul role="list">...</ul>;
}
```

## Responsive Design

Design for mobile first, then expand:

```tsx
// Tailwind: mobile-first responsive
<div className="
  grid grid-cols-1      /* Mobile: single column */
  sm:grid-cols-2        /* Small: 2 columns */
  lg:grid-cols-3        /* Large: 3 columns */
  gap-4
">
```

Test at these breakpoints: 320px, 768px, 1024px, 1440px.

For this site, verify especially:
- hero readability and CTA visibility on 320px
- product card density at 768px
- section rhythm and map usability at 1024px+

## Loading and Transitions

```tsx
// Skeleton loading (not spinners for content)
function TaskListSkeleton() {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading tasks">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-12 bg-muted animate-pulse rounded" />
      ))}
    </div>
  );
}

// Optimistic updates for perceived speed
function useToggleTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleTask,
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previous = queryClient.getQueryData(['tasks']);

      queryClient.setQueryData(['tasks'], (old: Task[]) =>
        old.map(t => t.id === taskId ? { ...t, done: !t.done } : t)
      );

      return { previous };
    },
    onError: (_err, _taskId, context) => {
      queryClient.setQueryData(['tasks'], context?.previous);
    },
  });
}
```

## See Also

- `prompt_redesign.md` (branding and redesign intent)
- `src/index.css` (design tokens and typography)
- `tailwind.config.ts` (theme extension and tokens)

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "Accessibility is a nice-to-have" | It's a legal requirement in many jurisdictions and an engineering quality standard. |
| "We'll make it responsive later" | Retrofitting responsive design is 3x harder than building it from the start. |
| "The design isn't final, so I'll skip styling" | Use the design system defaults. Unstyled UI creates a broken first impression for reviewers. |
| "This is just a prototype" | Prototypes become production code. Build the foundation right. |
| "The AI aesthetic is fine for now" | It signals low quality. Use the project's actual design system from the start. |

## Red Flags

- Components with more than 200 lines (split them)
- Inline styles or arbitrary pixel values
- Missing error states, loading states, or empty states
- No keyboard navigation testing
- Color as the sole indicator of state (red/green without text or icons)
- Generic "AI look" (purple gradients, oversized cards, stock layouts)
- New imported fonts or external typography dependencies
- Glitch/neon effects that conflict with brand direction

## Verification

After building UI:

- [ ] Component renders without console errors
- [ ] All interactive elements are keyboard accessible (Tab through the page)
- [ ] Screen reader can convey the page's content and structure
- [ ] Responsive: works at 320px, 768px, 1024px, 1440px
- [ ] Loading, error, and empty states all handled
- [ ] Follows the project's design system (spacing, colors, typography)
- [ ] No accessibility warnings in dev tools or axe-core
- [ ] No new fonts introduced; only existing local families are used
- [ ] Hero, product cards, and map maintain Empátika brand tone