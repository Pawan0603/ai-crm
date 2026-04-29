from fastapi import FastAPI
from routes import interaction

app = FastAPI()

app.include_router(interaction.router)

@app.get("/")
def root():
    return {"message": "Backend running"}