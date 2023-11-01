import React from "react";

export default function MainLayout({ children }) {
  return (
    <main className="overflow-auto border border-slate-800 shadow-md h-[60vh] bg-slate-950 py-4 container mx-auto px-4 max-w-7xl">
      {children}
    </main>
  );
}
