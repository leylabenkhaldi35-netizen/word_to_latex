from datetime import datetime
from pydantic import BaseModel


class ProjectCreate(BaseModel):
    name: str


class ProjectRead(BaseModel):
    id: int
    owner_id: int
    name: str
    updated_at: datetime | None

    class Config:
        from_attributes = True
