# Task Management App

This is a Next.js-based Task Management application that allows users to create and manage task lists and individual tasks.

## Features

- Create and manage task lists
- Add tasks to task lists
- Update task details (title, description, due date, status, assigned user)
- Responsive design for various screen sizes

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for building the application
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-management-app.git
   cd task-management-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Next.js app router pages and layouts
- `components/` - React components used throughout the application
  - `ui/` - Reusable UI components (buttons, inputs, etc.)
- `lib/` - Utility functions and shared logic
- `public/` - Static assets (images, fonts, etc.)

## Key Components

- `Dashboard`: Main component that displays task lists and manages their creation
- `CreateTaskList`: Component for creating new task lists
- `TaskList`: Displays tasks within a task list and manages their creation
- `CreateTask`: Component for creating new tasks
- `TaskDetails`: Displays and allows editing of task details

## Styling

This project uses Tailwind CSS for styling. The main configuration file is `tailwind.config.ts`, and global styles are defined in `app/globals.css`.

## Development

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Geist, a custom font.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [React Documentation](https://reactjs.org/docs/getting-started.html) - learn about React.
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - learn about TypeScript.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS.
- [shadcn/ui Documentation](https://ui.shadcn.com/docs) - learn about the components used in this project.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
