from pydantic import BaseSettings
import os

class Settings(BaseSettings):
    app_name: str = "FTX API"
    api_key: str = ""
    api_secret: str = ""
    root_dir = os.path.dirname(os.path.abspath(__file__))

    class Config:
        env_file = ".env"


settings = Settings()
