# Contributing

Thank you for your interest in contributing to this React TypeScript component library template!

## Development Process

This project uses the basic [GitHub Flow](https://guides.github.com/introduction/flow/):

1. Fork the repository and create your branch from `master`
2. Make your changes following the development workflow
3. Run the validation pipeline: `npm run validate`
4. Open a pull request and describe your changes

Please keep your contributions minimal and focused. Update or add tests as needed.

### Before Contributing

1. Read the [Development Guide](packages/react-example-package/DEVELOPMENT.md) for technical details
2. Understand the project philosophy of portability and simplicity for React components
3. Ensure your changes align with the template's educational goals
4. Consider React-specific patterns and best practices

### Testing Requirements

- All new React components must include comprehensive tests using React Testing Library
- Type constraint testing should be included for TypeScript features
- Run `npm run validate` before submitting changes
- Maintain or improve test coverage
- Test component rendering, props, and user interactions

### Documentation Updates

- Update relevant documentation when making React component changes
- Keep the multi-file knowledge base structure intact
- Ensure React component examples remain current and functional
- Update component prop documentation when APIs change

### React-Specific Guidelines

- Follow React best practices and hooks patterns
- Ensure components work with both class and functional component patterns
- Test components with different React versions within peer dependency range
- Maintain Tailwind CSS compatibility and styling guidelines
- Preserve tree-shaking optimization for individual component imports
