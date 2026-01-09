export interface Document {
  id: number;
  project_id: number;
  latex_content: string;
  compiled_pdf_path: string | null;
  version: number;
  updated_at: string | null;
}
