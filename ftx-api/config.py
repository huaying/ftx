from pydantic import BaseSettings


class Settings(BaseSettings):
    app_name: str = "FTX API"
    api_key: str = ""
    api_secret: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
