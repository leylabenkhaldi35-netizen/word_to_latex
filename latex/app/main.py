from pathlib import Path
import subprocess
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="LaTeX Sandbox Service")


class CompileRequest(BaseModel):
    project_id: int
    tex_path: str


class ConvertRequest(BaseModel):
    project_id: int
    docx_path: str


@app.post("/compile")
def compile_latex(payload: CompileRequest):
    tex_path = Path(payload.tex_path)
    if not tex_path.exists():
        raise HTTPException(status_code=404, detail="TeX file not found")

    workdir = tex_path.parent
    try:
        subprocess.run(
            [
                "pdflatex",
                "-interaction=nonstopmode",
                "-halt-on-error",
                tex_path.name,
            ],
            cwd=workdir,
            check=True,
            timeout=30,
            capture_output=True,
        )
    except subprocess.TimeoutExpired as exc:
        raise HTTPException(status_code=408, detail="Compilation timed out") from exc
    except subprocess.CalledProcessError as exc:
        raise HTTPException(status_code=400, detail=exc.stderr.decode("utf-8")) from exc

    pdf_path = workdir / f"{tex_path.stem}.pdf"
    if not pdf_path.exists():
        raise HTTPException(status_code=500, detail="PDF not generated")

    return {"pdf_path": str(pdf_path)}


@app.post("/convert")
def convert_docx(payload: ConvertRequest):
    docx_path = Path(payload.docx_path)
    if not docx_path.exists():
        raise HTTPException(status_code=404, detail="Docx file not found")

    try:
        result = subprocess.run(
            ["pandoc", "-f", "docx", "-t", "latex", str(docx_path)],
            check=True,
            timeout=60,
            capture_output=True,
        )
    except subprocess.TimeoutExpired as exc:
        raise HTTPException(status_code=408, detail="Conversion timed out") from exc
    except subprocess.CalledProcessError as exc:
        raise HTTPException(status_code=400, detail=exc.stderr.decode("utf-8")) from exc

    return {"latex_content": result.stdout.decode("utf-8")}
