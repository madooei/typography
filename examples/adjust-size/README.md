# Typography Readability Demo with Adjustable Settings

This example demonstrates the `@madooei/typography` package with an interactive interface for adjusting typography settings to optimize readability. It showcases how to implement user-controlled font size and line length adjustments while maintaining design system consistency.

## Features

### 🎛️ Interactive Typography Controls

- **Font Size Adjustment**: 80% - 120% scaling for accessibility and preference
- **Line Length Control**: 50-80 characters per line for optimal readability
- **Real-time Preview**: Changes apply instantly to the typography content
- **Reset Functionality**: One-click return to default settings

### 📐 Readability Optimizations

The package includes typography improvements based on readability research:

- **Line Height**: 1.75em (exceeds recommended 1.5em)
- **Letter Spacing**: 0.1em for improved character recognition
- **Word Spacing**: 0.12em for better word separation
- **Responsive Design**: Adapts to different screen sizes

### 🎨 Design System Integration

- Uses shadcn/ui components for consistent UI patterns
- Integrates with theme system (light/dark mode support)
- CSS variables for maintainable typography scaling
- Follows design system conventions throughout

## Technology Stack

- **React 18** with TypeScript
- **Tailwind CSS v4** for styling
- **shadcn/ui** components (Dialog, Slider, Button, Label)
- **Vite** for development and building
- **@madooei/typography** package for typography styles

## Setup

```bash
npm install
```

## Run the Example

```bash
npm run dev
```

This will start a Vite development server at `http://localhost:5173`.

## How It Works

### Typography Package Integration

The `@madooei/typography` package is installed locally using the `file:` protocol:

```json
{
  "dependencies": {
    "@madooei/typography": "file:../../packages/typography"
  }
}
```

### Component Architecture

1. **DemoFrame**: Main layout with header and adjustment controls
2. **TypographyAdjustmentCard**: Modal dialog with sliders for font/line adjustments
3. **Typography Component**: Wraps content with the typography system
4. **CSS Variable System**: Dynamic updates through CSS custom properties

### Key Implementation Details

#### Real-time Adjustments

```typescript
// Font size adjustment (80% to 120% of base)
const baseFontSize = fontSize[0] / 100;
typographyEl.style.setProperty(
  "--typography-font-size-base",
  `${baseFontSize}rem`
);

// Line length adjustment (50ch to 80ch)
typographyEl.style.maxWidth = `clamp(20rem, ${lineLength[0]}ch, 100%)`;
```

#### Design System Variables

```css
/* Typography CSS variables that scale with adjustments */
--typography-font-size-base: 1.2rem;
--typography-line-height-base: 1.75;
--typography-letter-spacing-body: calc(var(--typography-font-size-base) * 0.1);
--typography-word-spacing-body: calc(var(--typography-font-size-base) * 0.12);
```

#### shadcn/ui Integration

- **Dialog**: Accessible modal for typography settings
- **Slider**: Touch-friendly range controls with proper ARIA labels
- **Button**: Consistent button styling for actions
- **Label**: Proper form labeling for accessibility

## Publishing to NPM

To use the published package instead of the local version:

```json
{
  "dependencies": {
    "@madooei/typography": "latest"
  }
}
```

## Use Cases

This example is ideal for:

- **Accessibility**: Allowing users to adjust text size for visual comfort
- **Reading Applications**: Optimizing text layout for different reading preferences
- **Documentation Sites**: Providing customizable reading experiences
- **Design Systems**: Demonstrating scalable typography implementations
- **Educational Content**: Showing how typography affects readability

The demo shows how modern web typography can be both beautiful and functionally adaptable to user needs.
