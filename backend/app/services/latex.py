from pathlib import Path
from typing import Optional
import requests

from app.core.config import settings


class LatexCompileError(RuntimeError):
    pass


def compile_latex(project_id: int, latex_content: str) -> Optional[str]:
    storage_root = Path(settings.storage_dir) / "projects" / str(project_id)
    storage_root.mkdir(parents=True, exist_ok=True)
    tex_path = storage_root / "main.tex"
    tex_path.write_text(latex_content, encoding="utf-8")

    if not settings.latex_service_url:
        return None

    response = requests.post(
        f"{settings.latex_service_url.rstrip('/')}/compile",
        json={"project_id": project_id, "tex_path": str(tex_path)},
        timeout=30,
    )
    if response.status_code != 200:
        raise LatexCompileError(response.text)

    payload = response.json()
    return payload.get("pdf_path")
