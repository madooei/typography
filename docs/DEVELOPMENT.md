# Development Guide

This document provides technical details for developers working on this Typography package, including build architecture, development workflows, and typography-specific implementation patterns.

## Build Architecture

### TypeScript Configuration

**Multiple TypeScript Configurations:**

- `tsconfig.json` - Development configuration with all files included
- React JSX support with `"jsx": "react-jsx"` for modern JSX transform

**Key Settings:**

- Target: `ESNext` for modern JavaScript features
- Module: `ESNext` for ES modules
- JSX: `react-jsx` for automatic JSX runtime
- Strict mode enabled for type safety
- React types included

> [!TIP]
> For detailed information about TypeScript setup, see the [TypeScript Setup Guide](../../docs/guides/typescript.md).

### Build System (tsup)

**Why tsup for Typography package:**

- Fast builds with esbuild under the hood
- Dual format output (ESM + CJS) without complex configuration
- CSS asset handling with file copying and renaming
- Automatic declaration file generation
- Built-in code splitting and tree-shaking

**Configuration (`tsup.config.ts`):**

```typescript
export default defineConfig([
  // Main bundle with React component
  {
    entry: ["src/index.ts"],
    outDir: "dist",
    format: ["esm", "cjs"],
    sourcemap: true,
    clean: true,
    dts: true,
    splitting: false,
    treeshake: true,
    external: ["react", "react-dom", "tailwindcss"],
    esbuildOptions(options) {
      options.alias = {
        "@": "./src",
      };
      options.jsx = "automatic";
    },
  },
  // CSS asset handling
  {
    entry: ["src/styles/typography.css"],
    outDir: "dist",
    format: ["esm"],
    clean: false,
    esbuildOptions(options) {
      options.loader = { ".css": "copy" };
    },
    onSuccess: async () => {
      // Rename CSS file for better import experience
      const fs = await import("fs/promises");
      const path = await import("path");
      try {
        await fs.rename(
          path.join("dist", "typography.css"),
          path.join("dist", "styles.css"),
        );
      } catch (error) {
        console.warn("Could not rename CSS file:", error);
      }
    },
  },
]);
```

### Module Format Strategy

**Dual ESM/CJS Support for Typography:**

- Modern bundlers use ESM (`module` field)
- Legacy tools use CJS (`main` field)
- CSS file available as separate import

**package.json Configuration:**

```json
{
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      },
      "require": {
        "types": "./dist/index.d.cts",
        "default": "./dist/index.cjs"
      }
    },
    "./styles.css": "./dist/styles.css"
  }
}
```

## Typography Component Architecture

### Polymorphic Component Pattern

**Typography Component Structure:**

```typescript
import { cn } from "@/lib/utils";
import type { TypographyProps } from "@/types";
import { forwardRef, type ElementType } from "react";

const TypographyComponent = forwardRef<
  HTMLElement,
  TypographyProps<ElementType>
>(({ children, className, as, ...props }, ref) => {
  const Component = as || "div";

  return (
    <Component ref={ref} className={cn("typography", className)} {...props}>
      {children}
    </Component>
  );
});

TypographyComponent.displayName = "Typography";

export const Typography = TypographyComponent as <
  T extends ElementType = "div",
>(
  props: TypographyProps<T> & { ref?: React.Ref<HTMLElement> },
) => JSX.Element;
```

### TypeScript Polymorphic Types

**Type Definitions (`src/types.ts`):**

```typescript
import type { ElementType, ComponentPropsWithoutRef } from "react";

type AsProp<T extends ElementType> = {
  as?: T;
  asChild?: boolean;
};

type PropsToOmit = keyof AsProp<ElementType> | "className";

export type TypographyProps<T extends ElementType = "div"> = AsProp<T> &
  Omit<ComponentPropsWithoutRef<T>, PropsToOmit> & {
    className?: string;
  };
```

### Peer Dependencies Strategy

**Why Peer Dependencies for Typography:**

- React is optional (CSS-only usage supported)
- Prevents React version conflicts when used
- Reduces bundle size by not duplicating React

**Current Peer Dependencies:**

```json
{
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  },
  "peerDependenciesMeta": {
    "react": {
      "optional": true
    },
    "react-dom": {
      "optional": true
    }
  }
}
```

## CSS Typography System

### Design Token Architecture

**CSS Custom Properties System:**

The typography system uses a comprehensive design token architecture with CSS custom properties for maximum flexibility and customization.

**Base Variables:**

```css
.typography {
  /* Color System */
  --typography-text-color: oklch(0.145 0 0);
  --typography-text-muted: oklch(0.29 0 0);
  --typography-border-color: oklch(0.922 0 0);
  --typography-background-muted: oklch(0.97 0 0);
  --typography-background-color: oklch(1 0 0);
  --typography-link-color: oklch(0.205 0 0);
  --typography-highlight-background: oklch(0.97 0 0);
  --typography-highlight-text: oklch(0.205 0 0);
  --typography-background-card: oklch(1 0 0);
  --typography-background-card-text: oklch(0.145 0 0);

  /* Font System */
  --typography-font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --typography-font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --typography-font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --typography-font-family: var(--typography-font-sans);

  /* Base Values */
  --typography-font-size-base: 1rem;
  --typography-line-height-base: 1.75;
  --typography-spacing-unit: 0.25rem;
  --typography-font-scale: 1.25;
  --typography-heading-scale: 1.15;
}
```

**Derived Variables (Design Tokens):**

```css
.typography {
  /* Spacing Scale */
  --typography-space-xs: calc(0.5 * var(--typography-spacing-unit));
  --typography-space-sm: var(--typography-spacing-unit);
  --typography-space-md: calc(2 * var(--typography-spacing-unit));
  --typography-space-lg: calc(4 * var(--typography-spacing-unit));
  --typography-space-xl: calc(8 * var(--typography-spacing-unit));
  --typography-space-xxl: calc(12 * var(--typography-spacing-unit));
  --typography-space-xxxl: calc(16 * var(--typography-spacing-unit));

  /* Font Size Scale (Modular Scale) */
  --typography-font-size-sm: calc(var(--typography-font-size-base) / var(--typography-font-scale));
  --typography-font-size-body: var(--typography-font-size-base);
  --typography-font-size-lead: calc(var(--typography-font-size-base) * var(--typography-font-scale));
  --typography-font-size-h6: calc(var(--typography-font-size-base) * var(--typography-heading-scale));
  --typography-font-size-h5: calc(var(--typography-font-size-h6) * var(--typography-heading-scale));
  --typography-font-size-h4: calc(var(--typography-font-size-h5) * var(--typography-heading-scale));
  --typography-font-size-h3: calc(var(--typography-font-size-h4) * var(--typography-heading-scale));
  --typography-font-size-h2: calc(var(--typography-font-size-h3) * var(--typography-heading-scale));
  --typography-font-size-h1: calc(var(--typography-font-size-h2) * var(--typography-heading-scale));
}
```

### Responsive Design

**Container Queries and Media Queries:**

```css
.typography {
  /* Enable container queries */
  container-type: inline-size;
  
  /* Base responsive settings */
  max-width: clamp(20rem, 65ch, 100%);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--typography-space-lg);
  padding-right: var(--typography-space-lg);
  padding-top: var(--typography-space-xl);
  padding-bottom: var(--typography-space-xl);
}

/* Responsive typography adjustments */
@media (min-width: 640px) {
  .typography {
    padding-left: var(--typography-space-xl);
    padding-right: var(--typography-space-xl);
  }
}

@media (min-width: 768px) {
  .typography {
    padding-left: var(--typography-space-xxl);
    padding-right: var(--typography-space-xxl);
    padding-top: var(--typography-space-xxxl);
    padding-bottom: var(--typography-space-xxxl);
  }
}
```

### Dark Mode Support

**CSS Variable Overrides:**

```css
/* Dark mode support */
.dark .typography {
  --typography-text-color: oklch(0.985 0 0);
  --typography-text-muted: oklch(1 0 0 / 77%);
  --typography-border-color: oklch(1 0 0 / 10%);
  --typography-background-muted: oklch(0.369 0 0);
  --typography-background-color: oklch(0.26 0 0);
  --typography-link-color: oklch(0.922 0 0);
  --typography-highlight-background: oklch(0.269 0 0);
  --typography-highlight-text: oklch(0.985 0 0);
  --typography-background-card: oklch(0.24 0 0);
  --typography-background-card-text: oklch(0.985 0 0);
}
```

## Testing Strategy

### React Testing Library Configuration

**Why React Testing Library for Typography:**

- Focuses on testing user interactions rather than implementation details
- Better integration with React components
- Simulates real user behavior

**Key Features Configured:**

- jsdom environment for DOM simulation
- React Testing Library utilities
- Component rendering helpers
- CSS class and styling tests

**Test Patterns:**

- Component rendering tests
- Polymorphic `as` prop tests
- CSS class application tests
- Typography styling validation

### Testing Setup

**Vitest Configuration for Typography:**

```typescript
// vitest.config.ts
export default defineConfig({
  environment: "jsdom", // DOM simulation for React
  setupFiles: ["./tests/setup.ts"], // React Testing Library setup
  test: {
    globals: true, // No need to import test functions
  },
});
```

**Test Setup File:**

```typescript
// tests/setup.ts
import "@testing-library/jest-dom"; // Additional matchers
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup(); // Clean up after each test
});
```

## Development Workflow

### Typography Development Mode

**The `npm run dev` Command:**

- Runs tsx in watch mode
- Hot reloads React components and CSS changes
- TypeScript compilation on save
- Instant feedback for typography changes

### Validation Pipeline for Typography

**The `npm run validate` Command:**

1. **Type checking** - `tsc --noEmit` (includes React JSX validation)
2. **Linting with auto-fix** - `eslint --fix` (includes React rules)
3. **Formatting with auto-fix** - `prettier --write .`
4. **Testing** - `vitest run` (includes React component tests)

### Typography-Specific Scripts

**Component Development:**

- `npm run dev` - Watch mode for component development
- `npm run build` - Build components and CSS for distribution
- `npm run test` - Run React component tests
- `npm run test:watch` - Watch mode for test development

## Key Typography Implementation Patterns

### Polymorphic Component Pattern

**TypeScript Interface with Polymorphic Support:**

```typescript
import type { ElementType, ComponentPropsWithoutRef } from "react";

type AsProp<T extends ElementType> = {
  as?: T;
  asChild?: boolean;
};

type PropsToOmit = keyof AsProp<ElementType> | "className";

export type TypographyProps<T extends ElementType = "div"> = AsProp<T> &
  Omit<ComponentPropsWithoutRef<T>, PropsToOmit> & {
    className?: string;
  };
```

### CSS Utility Integration

**ClassName Utility Pattern:**

```typescript
import { cn } from "@/lib/utils";

export const Typography = forwardRef<
  HTMLElement,
  TypographyProps<ElementType>
>(({ children, className, as, ...props }, ref) => {
  const Component = as || "div";

  return (
    <Component 
      ref={ref} 
      className={cn("typography", className)} 
      {...props}
    >
      {children}
    </Component>
  );
});
```

### Design Token Customization

**CSS Variable Override Pattern:**

```css
/* Example: Mapping to shadcn/ui theme */
.typography {
  --typography-text-color: var(--foreground) !important;
  --typography-text-muted: var(--muted-foreground) !important;
  --typography-border-color: var(--border) !important;
  --typography-background-muted: var(--muted) !important;
  --typography-background-color: var(--background) !important;
  --typography-link-color: var(--primary) !important;
  --typography-highlight-background: var(--secondary) !important;
  --typography-highlight-text: var(--secondary-foreground) !important;
  --typography-background-card: var(--card) !important;
  --typography-background-card-text: var(--card-foreground) !important;
  --typography-font-sans: var(--font-sans) !important;
  --typography-font-serif: var(--font-serif) !important;
  --typography-font-mono: var(--font-mono) !important;
}
```

## Code Quality Setup

### ESLint Configuration for Typography

**Rules Applied:**

- TypeScript ESLint recommended rules
- React ESLint plugin for React-specific rules
- React Hooks rules for proper hooks usage
- JSX accessibility rules
- Prettier integration to avoid conflicts

### Typography Testing Patterns

**Component Testing Strategy:**

```typescript
import { render, screen } from "@testing-library/react";
import { Typography } from "../src/components/typography";

describe("Typography Component", () => {
  it("renders with typography class", () => {
    render(<Typography>Content</Typography>);
    expect(screen.getByText("Content")).toHaveClass("typography");
  });

  it("renders as different elements with as prop", () => {
    render(<Typography as="article">Content</Typography>);
    expect(screen.getByText("Content").tagName).toBe("ARTICLE");
  });

  it("merges custom className", () => {
    render(<Typography className="custom-class">Content</Typography>);
    expect(screen.getByText("Content")).toHaveClass("typography", "custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Typography ref={ref}>Content</Typography>);
    expect(ref.current).toBe(screen.getByText("Content"));
  });
});
```

## File Organization

### Typography Package Structure

```plaintext
src/
├── index.ts              # Main exports and public API
├── components/
│   └── typography.tsx    # Typography component implementation
├── types.ts              # Type definitions
├── lib/
│   └── utils.ts          # Utility functions (cn, etc.)
├── styles/
│   └── typography.css    # CSS typography system
└── utils/
    └── peer-deps-check.ts # Peer dependency validation
```

### Test Structure

```plaintext
tests/
├── setup.ts              # React Testing Library setup
└── index.test.tsx        # Comprehensive component tests
```

## Technical Decisions

### Why These Tools for Typography?

**tsup over webpack/rollup:** Simpler configuration, faster builds, better CSS asset handling

**React Testing Library over Enzyme:** Modern testing approach, better accessibility testing

**CSS Custom Properties:** Essential for creating flexible, themeable typography systems

**Polymorphic Components:** Single component with element flexibility reduces API complexity

### Typography Development Philosophy

1. **CSS-First Approach:** Pure CSS typography system with optional React wrapper
2. **Design Token Architecture:** Comprehensive CSS custom properties for maximum flexibility
3. **Modular Scale:** Mathematical typography scale for consistent visual hierarchy
4. **Accessibility First:** Ensure typography works with screen readers and meets WCAG standards
5. **Responsive Design:** Mobile-first responsive typography with modern CSS features

### Typography-Specific Considerations

**CSS Asset Handling:** CSS files are copied and renamed during build for better import experience.

**Peer Dependencies:** React is optional, allowing CSS-only usage while supporting React integration.

**Design Token Mapping:** CSS variables enable easy integration with existing design systems like shadcn/ui, Tailwind CSS, etc.

**Modular Scale:** Mathematical typography scale provides better visual hierarchy than arbitrary font sizes.
