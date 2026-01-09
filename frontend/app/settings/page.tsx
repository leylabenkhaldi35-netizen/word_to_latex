export default function SettingsPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage security settings, theme preferences, and account details. These panels will integrate with
          the backend APIs when connected.
        </p>
      </div>
    </div>
  );
}
