from fastapi import APIRouter
from schemas.interaction import Interaction
from services.ai import extract_interaction_data

router = APIRouter(prefix="/interaction")

from services.agent import run_agent

# ✅ 1. Manual Save
@router.post("/save")
def save_interaction(data: Interaction):
    print("Received:", data)
    return {
        "status": "success",
        "data": data
    }

# ✅ 2. AI Extract
@router.post("/ai")
def ai_extract(data: dict):
    user_input = data["message"]

    result = extract_interaction_data(user_input)

    return {
        "status": "success",
        "data": result
    }


@router.post("/agent")
def agent_route(data: dict):
    user_input = data["message"]

    result = run_agent(user_input)

    return {
        "status": "success",
        "data": result
    }