import Link from "next/link";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-950">
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">Workspace</p>
        <h1 className="text-lg font-semibold">Modern LaTeX Authoring</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">
          Light/Dark
        </button>
        <Link
          href="/settings"
          className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs">
            JD
          </span>
          Account
        </Link>
      </div>
    </header>
  );
}
