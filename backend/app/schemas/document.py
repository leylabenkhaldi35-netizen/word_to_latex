from datetime import datetime
from pydantic import BaseModel


class DocumentUpdate(BaseModel):
    latex_content: str


class DocumentRead(BaseModel):
    id: int
    project_id: int
    latex_content: str
    compiled_pdf_path: str | None
    version: int
    updated_at: datetime | None

    class Config:
        from_attributes = True
