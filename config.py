from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    app_name: str = "AI Playground"
    mode: str = "demo"
    anthropic_api_key: str = ""
    openai_api_key: str = ""
    google_ai_key: str = ""
    model_config = {"env_file": ".env"}


@lru_cache
def get_settings() -> Settings:
    return Settings()
