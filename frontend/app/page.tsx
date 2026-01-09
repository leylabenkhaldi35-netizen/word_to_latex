import Link from "next/link";
import ProjectList from "../components/ProjectList";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Create or open a LaTeX workspace. Convert Word files and compile PDFs in real time.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/projects/new"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900"
          >
            New Project
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
          >
            Sign in
          </Link>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Your Projects</h2>
        <ProjectList />
      </section>
    </div>
  );
}
