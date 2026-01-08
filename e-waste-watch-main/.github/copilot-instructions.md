# E-Waste Watch - AI Coding Guidelines

## Architecture Overview
This is a React SPA for e-waste reporting using Vite, TypeScript, and shadcn/ui. Citizens report illegal dumping via image/location data; authorities track and resolve cases through dashboard/map views.

**Key Components:**
- **Pages** (`src/pages/`): Route-based views (Dashboard, MapPage, Index)
- **Feature Components** (`src/components/{dashboard,map,report}/`): Organized by functionality
- **UI Components** (`src/components/ui/`): shadcn/ui primitives with custom variants
- **Data Layer**: Mock data in `src/data/mockData.ts`, types in `src/types/ewaste.ts`

**Data Flow:** React Query for API calls (currently mock), React Router for navigation, form handling with react-hook-form + Zod.

## Development Workflow
- **Start dev server:** `npm run dev` (Vite on port 8080)
- **Build:** `npm run build` (outputs to `dist/`)
- **Lint:** `npm run lint` (ESLint with React/TypeScript rules)
- **Preview build:** `npm run preview`

No tests configured yet. Use mock data for development.

## Code Patterns
- **Imports:** Use `@/` alias for `src/` (configured in `vite.config.ts`)
- **Styling:** Tailwind CSS with `cn()` utility from `src/lib/utils.ts` for class merging
- **Components:** shadcn/ui pattern - variants via `cva()`, forwardRef, asChild prop
- **Forms:** react-hook-form with Zod schemas (not yet implemented in forms)
- **Icons:** Lucide React icons
- **Layout:** Fixed header layout via `Layout` component

**Example Component Structure:**
```tsx
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const componentVariants = cva("base-classes", {
  variants: { variant: { default: "", custom: "custom-styles" } }
});

interface Props extends VariantProps<typeof componentVariants> {
  // props
}

export const Component = ({ variant, className, ...props }: Props) => (
  <div className={cn(componentVariants({ variant }), className)} {...props} />
);
```

## Key Files
- `src/types/ewaste.ts`: Core types (Report, Hotspot, DashboardStats)
- `src/data/mockData.ts`: Sample data for development
- `src/App.tsx`: Routing setup with React Router + QueryClient
- `tailwind.config.ts`: Custom colors (primary, success, etc.) and animations
- `components.json`: shadcn/ui configuration

## Conventions
- Component organization: Feature-based folders under `src/components/`
- TypeScript strict mode enabled
- ESLint: React hooks and refresh rules enforced
- No CSS modules; pure Tailwind classes</content>
<parameter name="filePath">c:\Users\saiva\OneDrive\Documents\hack\Eco warriors\final kgreddy\e-waste-watch-main\.github\copilot-instructions.md