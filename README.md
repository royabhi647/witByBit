# Assignment: Product Management System

This project is a Product Management System built using ReactJS, Tailwind CSS, TypeScript, Redux Toolkit and React Hook Form. The application features a sidebar navigation system, responsive grids for product categorization, a category addition functionality, and a multi-step product addition form with data retention.

## Features

### Sidebar Navigation
- A working sidebar navigation system with routes.
- Currently, the "Products" screen is implemented.

### Products Screen
- Displays products in a categorized manner using responsive grids.
- **Add Category**: Adds a new category to the grid dynamically.
- **Add Product**: Redirects to a multi-step form for product addition.

### Add Product Screen
- A multi-step form for adding products like Description, Variants, Combinations and Price Info.
- Data retention when navigating between steps.
- Field validation as per the design specifications.
- On confirmation, redirects back to the Products screen with the new product added.

## Tech Stack
- **Framework**: ReactJS (with TypeScript)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Form Handling**: React Hook Form

## Installation

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/royabhi647/witByBit.git
   cd witByBit
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5174
   ```