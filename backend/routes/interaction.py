from fastapi import APIRouter
from schemas.interaction import Interaction

router = APIRouter(prefix="/interaction")

# 👉 SAVE FORM DATA
@router.post("/save")
def save_interaction(data: Interaction):
    print("Received:", data)
    return {
        "status": "success",
        "data": data
    }