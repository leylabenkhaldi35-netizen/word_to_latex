from pathlib import Path
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.document import Document
from app.models.project import Project
from app.routers.auth import get_current_user
from app.schemas.document import DocumentRead, DocumentUpdate
from app.services.docx import DocxConversionError, convert_docx
from app.services.latex import LatexCompileError, compile_latex
from app.core.config import settings

router = APIRouter(prefix="/projects", tags=["documents"])


def _get_project(db: Session, project_id: int, user_id: int) -> Project:
    project = (
        db.query(Project)
        .filter(Project.id == project_id, Project.owner_id == user_id)
        .first()
    )
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.get("/{project_id}/document", response_model=DocumentRead)
def get_document(
    project_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    _get_project(db, project_id, current_user.id)
    document = db.query(Document).filter(Document.project_id == project_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    return document


@router.put("/{project_id}/document", response_model=DocumentRead)
def update_document(
    project_id: int,
    payload: DocumentUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    _get_project(db, project_id, current_user.id)
    document = db.query(Document).filter(Document.project_id == project_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    document.latex_content = payload.latex_content
    document.version += 1
    db.commit()
    db.refresh(document)
    return document


@router.post("/{project_id}/compile", response_model=DocumentRead)
def compile_document(
    project_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    _get_project(db, project_id, current_user.id)
    document = db.query(Document).filter(Document.project_id == project_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    try:
        pdf_path = compile_latex(project_id, document.latex_content)
    except LatexCompileError as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    document.compiled_pdf_path = pdf_path
    db.commit()
    db.refresh(document)
    return document


@router.get("/{project_id}/pdf")
def get_compiled_pdf(
    project_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    _get_project(db, project_id, current_user.id)
    document = db.query(Document).filter(Document.project_id == project_id).first()
    if not document or not document.compiled_pdf_path:
        raise HTTPException(status_code=404, detail="Compiled PDF not found")
    pdf_path = Path(document.compiled_pdf_path)
    if not pdf_path.exists():
        raise HTTPException(status_code=404, detail="Compiled PDF missing from storage")
    return FileResponse(str(pdf_path), media_type="application/pdf")


@router.post("/{project_id}/convert", response_model=DocumentRead)
def convert_document(
    project_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    _get_project(db, project_id, current_user.id)
    if not file.filename.endswith(".docx"):
        raise HTTPException(status_code=400, detail="Only .docx files are supported")

    storage_root = Path(settings.storage_dir) / "projects" / str(project_id)
    storage_root.mkdir(parents=True, exist_ok=True)
    docx_path = storage_root / "source.docx"
    with docx_path.open("wb") as buffer:
        buffer.write(file.file.read())

    try:
        latex_content = convert_docx(project_id, docx_path)
    except DocxConversionError as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    if latex_content is None:
        raise HTTPException(status_code=503, detail="Conversion service unavailable")

    document = db.query(Document).filter(Document.project_id == project_id).first()
    if not document:
        document = Document(project_id=project_id, latex_content=latex_content)
        db.add(document)
    else:
        document.latex_content = latex_content
        document.version += 1
    db.commit()
    db.refresh(document)
    return document
