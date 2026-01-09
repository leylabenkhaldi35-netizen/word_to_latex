export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-xl space-y-4">
      <h1 className="text-2xl font-semibold">Create a new project</h1>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">
          Project name
        </label>
        <input
          type="text"
          placeholder="Research paper, Thesis, Proposal"
          className="mt-2 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-slate-400 dark:border-slate-700"
        />
        <button className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900">
          Create project
        </button>
      </div>
    </div>
  );
}
