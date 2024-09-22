# Vue 3 Chart Project

This project is a Vue 3 application built with Vite, featuring a dynamic chart component. It demonstrates the integration of modern Vue practices with data visualization capabilities.

## Features

- Vue 3 composition API
- Vite for fast development and building
- Custom chart component for data visualization
- ESLint and Prettier for code quality and formatting

## Prerequisites

- Node.js (version 14.x or later recommended)
- npm, yarn, or Bun

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   # or
   bun run dev
   ```

4. Open your browser and visit `http://localhost:5173` to see the application.

## Project Structure

- `src/` - Source files
  - `components/` - Vue components
    - `ChartComponent.vue` - Custom chart component
  - `App.vue` - Main application component
  - `main.js` - Application entry point
- `public/` - Static assets
- `vite.config.js` - Vite configuration
- `.eslintrc.js` - ESLint configuration
- `.prettierrc` - Prettier configuration

## Available Scripts

- `npm run dev` / `yarn dev` / `bun run dev` - Start the development server
- `npm run build` / `yarn build` / `bun run build` - Build for production
- `npm run preview` / `yarn preview` / `bun run preview` - Preview the production build
- `npm run lint` / `yarn lint` / `bun run lint` - Run ESLint
- `npm run format` / `yarn format` / `bun run format` - Format code with Prettier

## Using Bun

Bun is a fast all-in-one JavaScript runtime. To use Bun with this project:

1. Install Bun:
   ```
   curl -fsSL https://bun.sh/install | bash
   ```

2. Use Bun commands:
   - Install dependencies: `bun install`
   - Run scripts: `bun run <script-name>`
   - Start dev server: `bun run dev`

Note: Ensure your `package.json` scripts are compatible with Bun. Most npm scripts should work with Bun without modifications.

## Customizing the Chart Component

The `ChartComponent.vue` file contains the custom chart implementation. You can modify this component to change the chart type, data, or styling as needed for your project.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
