# Typography

A minimal CSS typography with an optional Typography component for React applications.

**Features:**

- Written in pure CSS and TypeScript
- Builds to both modern ES modules and CommonJS formats
- Provides TypeScript type definitions
- ESLint for code linting
- Prettier for code formatting
- Vitest for testing
- Tsup for building
- React component optimization with tree-shaking

## Installation

```bash
npm install @madooei/typography
```

**Peer Dependencies**: If you are going to use the `Typography` component, make sure to install React and React DOM as peer dependencies:

```bash
npm install react react-dom
```

### Styling

The package provides a CSS file that you can import into your project.

Add to your main CSS file:

```css
@import "@madooei/typography/styles.css";
```

Or, add to your entry JavaScript file:

```js
import "@madooei/typography/styles.css";
```

You can then use the `typography` class to apply the typography styles to a specific element.

#### Customization

You can customize the styles by overriding the CSS variables. Here is an example to map the typography styles to the Shadcn UI theme.

```css
@import "@madooei/typography/styles.css";
/* Make sure index.css (your main CSS file) is imported before this file */
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

> [!IMPORTANT]
> Don't forget to add the `!important` flag to the CSS variables to override the default styles.

> [!TIP]
> If you want transparent backgrounds, you can set the background color a nonexistent color variable, like `var(--undefined-color)`.

## Typography Component

The package provides a `Typography` component that you can use to apply the typography styles to a specific element.

```tsx
import { Typography } from "@madooei/typography";
import "@madooei/typography/styles.css";

const TypographyPage: React.FC = () => {
  return <Typography>{/* Your content */}</Typography>;
};

export default TypographyPage;
```

### Props

The `Typography` component accepts the following props:

- `as` (string): The HTML element to render the component as.

```tsx
<Typography as="article">Content</Typography>
<Typography as="main">Content</Typography>
<Typography as="section">Content</Typography>
<Typography as="aside">Content</Typography>

// Default behavior as a div
<Typography>Content</Typography>
```

## Cloning the Repository

To make your workflow more organized, it's a good idea to clone this repository into a directory named `typography-workspace`. This helps differentiate the workspace from the `typography` located in the `packages` directory.

```bash
git clone https://github.com/madooei/typography typography-workspace

cd typography-workspace
```

## Repository Structure

- `packages` — Contains the primary package(s) for this repository (e.g., `typography`). Each package is self-contained and can be copied out and used independently.
- `examples` — Contains examples of how to use the packages. Each example is a minimal, standalone project.
- `playgrounds` — Contains demos of the dependencies of the primary package(s). Each playground is a minimal, standalone project.
- `docs` — Contains various documentation for users and developers.
- `.github` — Contains GitHub-specific files, such as workflows and issue templates.

## How to Use This Repo

- To work on a package, go to `packages/<package-name>` and follow its README.
- To try an example, go to `examples/<example-name>` and follow its README.
- To run the playground, go to `playground/<package-name>` and follow its README.
- For documentation, see the `docs` folder.

### Using a VSCode Multi-root Workspace

With Visual Studio Code, you can enhance your development experience by using a multi-root workspace to access packages, examples, and playgrounds simultaneously. This approach is more efficient than opening the root directory, or each package or example separately.

To set up a multi-root workspace:

1. Open Visual Studio Code.
2. Navigate to `File > Open Workspace from File...`.
3. Select the `typography.code-workspace` file located at the root of the repository. This action will open all specified folders in one workspace.

The `typography.code-workspace` file can be customized to include different folders or settings. Here's a typical configuration:

```json
{
  "folders": [
    {
      "path": "packages/typography"
    },
    {
      "path": "examples/react-basic"
    }
  ],
  "settings": {
    // Add any workspace-specific settings here, for example:
    "git.openRepositoryInParentFolders": "always"
  }
}
```

## Developing the Package

Change to the package directory and install dependencies:

```bash
cd packages/typography
npm install
```

- Read the [Project Roadmap](../../docs/ROADMAP.md) for project goals, status, evolution, and development guidelines.
- Read the [Development Guide](DEVELOPMENT.md) for detailed information on the package architecture, build configuration, and implementation patterns.
- Follow the [Contributing Guide](../../docs/CONTRIBUTING.md) for contribution guidelines, coding standards, and best practices.

## Package Management

When you are ready to publish your package:

```bash
npm run release
```

This single command will:

- Validate your code with the full validation pipeline
- Analyze commits to determine version bump
- Update package.json version and changelog
- Build the package
- Create and push git tag
- Create GitHub release
- Publish to NPM

> [!TIP]
> For detailed information about package publishing, versioning, and local development workflows, see the [NPM Package Management Guide](../../docs/guides/npm-package.md).
