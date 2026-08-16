/*
Name: Group 5
Date: August 2026
Program: Internet Movies Rental (IMR) Movie Management Application.
This component displays company and contact information at the bottom of the site.
It provides consistent footer content throughout the application.
The footer is styled using Tailwind CSS and supports responsive layouts.
*/

export default function Footer() {
  return (
    <footer className="mt-auto bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-6xl px-6 py-8 text-center">
        <p className="font-semibold text-white">
          Internet Movies Rental Company
        </p>

        <p className="mt-2 text-sm">
          Email: support@imrmovies.com
        </p>

        <p className="text-sm">
          Phone: 403-555-0100
        </p>

        <p className="mt-4 text-xs text-slate-400">
          © 2026 Internet Movies Rental. All rights reserved.
        </p>
      </div>
    </footer>
  );
}