import EditorPane from "../../../components/EditorPane";
import PdfPreview from "../../../components/PdfPreview";

export default function ProjectEditorPage() {
  return (
    <div className="flex h-[calc(100vh-96px)] flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Project Editor</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Autosave enabled • Real-time compile preview
          </p>
        </div>
        <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">
          Compile PDF
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-4 lg:flex-row">
        <EditorPane />
        <PdfPreview />
      </div>
    </div>
  );
}
