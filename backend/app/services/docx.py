from pathlib import Path
from typing import Optional
import requests

from app.core.config import settings


class DocxConversionError(RuntimeError):
    pass


def convert_docx(project_id: int, docx_path: Path) -> Optional[str]:
    if not settings.latex_service_url:
        return None

    response = requests.post(
        f"{settings.latex_service_url.rstrip('/')}/convert",
        json={"project_id": project_id, "docx_path": str(docx_path)},
        timeout=60,
    )
    if response.status_code != 200:
        raise DocxConversionError(response.text)

    payload = response.json()
    return payload.get("latex_content")
