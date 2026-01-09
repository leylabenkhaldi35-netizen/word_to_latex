"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";

const defaultValue = `\\documentclass{article}
\\begin{document}
Hello, LaTeX!
\\end{document}`;

export default function EditorPane() {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span>main.tex</span>
        <span>Autosave enabled</span>
      </div>
      <Editor
        height="100%"
        defaultLanguage="latex"
        theme="vs-dark"
        value={value}
        onChange={(val) => setValue(val || "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}
