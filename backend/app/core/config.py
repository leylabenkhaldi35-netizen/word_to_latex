from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql+psycopg://word_to_latex:word_to_latex@db:5432/word_to_latex"
    jwt_secret: str = "change-me"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    storage_dir: str = "/app/data"
    latex_service_url: str | None = None

    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
