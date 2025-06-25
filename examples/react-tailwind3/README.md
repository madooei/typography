# Example Usage For `@madooei/typography` (React + Tailwind CSS v3)

This is a React application demonstrating how to use the React components from `@madooei/typography`.

> [!NOTE]
> This example uses Tailwind CSS v3 for styling. If you want to use Tailwind CSS v4, you can check the `examples/react-tailwind4` directory.

## Setup

```bash
npm install
```

## Run the Example

```bash
npm run dev
```

This will start a Vite development server at `http://localhost:4001` showing the example components in action. 

## How does it work?

The `@madooei/typography` is a local package that is installed using the `file:` protocol; see the `dependencies` section in the `package.json` file:

```json
  "dependencies": {
    "@madooei/typography": "file:../../packages/typography"
  },
```

If you want to use the package through NPM, you can do so by changing the `dependencies` section in the `package.json` file to:

```json
  "dependencies": {
    "@madooei/typography": "latest"
  },
```

Then install the dependencies again and it will be installed through NPM (assuming you have published the package to NPM).
