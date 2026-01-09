import "../styles/globals.css";
import type { ReactNode } from "react";
import { AuthProvider } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export const metadata = {
  title: "Word to LaTeX Studio",
  description: "Modern LaTeX authoring workspace",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <div className="flex min-h-screen bg-surface dark:bg-surface-dark">
            <Sidebar />
            <div className="flex flex-1 flex-col">
              <Topbar />
              <main className="flex-1 p-6">{children}</main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
