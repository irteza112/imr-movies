This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# IMR Movies Portal

A full-stack web application created for the **Internet Movies Rental Company (IMR)**. The portal allows users to view and manage movie information through a web interface connected to a Supabase database.

## Features

- View a list of movies
- Display movie titles, actors, and release years
- Add new movies
- Edit existing movies
- Delete movies
- User authentication
- Supabase database integration
- Responsive navigation bar and footer

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase
- Git and GitHub

## Getting Started

Install the project dependencies:

```bash
npm install
```

Create a `.env.local` file in the root directory and add the required Supabase environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Do not commit the `.env.local` file or private credentials to GitHub.

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

in your browser.

## Project Purpose

This project was developed as a group full-stack web development assignment. It demonstrates the use of Next.js with Supabase to create a database-driven web application with authentication and CRUD operations.

## Contributors

Developed collaboratively by the IMR Movies project team.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
