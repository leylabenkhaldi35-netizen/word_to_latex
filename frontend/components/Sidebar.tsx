import Link from "next/link";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/projects/new", label: "Projects" },
  { href: "/settings", label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 lg:flex">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Studio</p>
        <h2 className="text-xl font-semibold">Word to LaTeX</h2>
      </div>
      <nav className="space-y-2 text-sm font-medium">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-lg px-3 py-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto rounded-xl border border-dashed border-slate-300 p-4 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
        Tip: Drag a .docx file into your project to convert it to LaTeX instantly.
      </div>
    </aside>
  );
}
