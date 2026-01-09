export default function PdfPreview() {
  return (
    <div className="flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span>Preview</span>
        <span>Latest compile</span>
      </div>
      <div className="flex h-full items-center justify-center text-sm text-slate-500 dark:text-slate-400">
        PDF preview will render here after compilation.
      </div>
    </div>
  );
}
