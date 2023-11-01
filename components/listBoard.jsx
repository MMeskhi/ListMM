import React from "react";

export default function MainLayout({ children }) {
  return (
    <section className="overflow-auto border border-slate-800 shadow-md h-[70vh] w-full bg-slate-950 py-4 container mx-auto px-4">
      {children}
    </section>
  );
}
