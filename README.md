# ShopHub — React E-commerce & Dashboard

A React-based e-commerce learning project combining product discovery, shopping interactions, and dashboard/task-management screens. Developed as a hands-on web development project.

> **Project status:** Educational prototype, not a production store. Some views are independent demonstrations, and checkout/authentication flows are not connected to a production backend or payment provider.

## Preview

- [Live demo](https://iridescent-toffee-899ceb.netlify.app/) *(linked by the project; deployment status should be checked before sharing with recruiters)*
- [Source code](https://github.com/MoemenTurkmani1/final)

## What the code covers

- **Product discovery:** product listing, search, category/price filters, and sorting. The product grid retrieves sample catalog data from Fake Store API and caches it in browser storage.
- **Shopping interactions:** cart and favorites interfaces, using React state and browser storage in parts of the project.
- **Dashboard and task management:** additional routes and components for a dashboard and a task list.
- **Frontend structure:** reusable components, page-level routes, context providers, styling, and responsive UI work.

These are features or screens represented in the repository; not all flows are fully integrated end-to-end.

## Tech stack

| Area | Technologies |
| --- | --- |
| UI | React, JavaScript (JSX), Tailwind CSS, CSS |
| Routing | React Router |
| Tooling | Vite, ESLint |
| Data | Fake Store API and browser localStorage (demo use) |
| Icons | Lucide React |

See `package.json` for the installed dependency versions.

## Run locally

Requirements: Node.js and npm.

```bash
git clone https://github.com/MoemenTurkmani1/final.git
cd final
npm install
npm run dev
```

Open the local URL shown by Vite.

To run the available frontend checks:

```bash
npm run lint
npm run build
```

## Project structure

```text
src/
├── components/   # Shared UI, product views and dashboard parts
├── context/      # React context providers
├── data/         # Sample product data
├── pages/        # Main application screens
├── App.jsx       # Route setup
└── main.jsx      # Application entry point
```

## Current limitations and next steps

- Some screens still use prototype data-loading logic, including `window.fs.readFile`, which is not a standard browser API. These paths need refactoring.
- Product detail, cart, and favorites interactions need more consistent shared state across routes.
- There is no production authentication system, checkout backend, or real payment processing.
- Improve error/loading states, add tests, validate the full deployed flow, and document the contributor's individual work on any collaborative features.

## About this project

This repository demonstrates practice with component-based frontend development, React routing, interactive UI states, and third-party data. It is shared as a learning portfolio project rather than a finished commercial application.
