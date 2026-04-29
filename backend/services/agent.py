import os
import json
import re
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# ---------------------------
# 🛠️ TOOLS
# ---------------------------

def log_interaction(data):
    print("📦 Saving Interaction:", data)
    return {"status": "saved", "data": data}

def edit_interaction(data):
    print("✏️ Editing Interaction:", data)
    return {"status": "updated", "data": data}

def suggest_followup(data):
    return {"suggestion": "Follow-up in 1 week"}

def summarize_text(text):
    return {"summary": text[:50]}

def get_hcp_details(name):
    return {"hcp": name, "specialization": "Oncology"}


# ---------------------------
# 🧠 JSON EXTRACTOR (IMPORTANT FIX)
# ---------------------------

def extract_json(text: str):
    try:
        match = re.search(r"\{.*\}", text, re.DOTALL)
        if match:
            return json.loads(match.group())
        else:
            return {"error": "No JSON found", "raw": text}
    except Exception as e:
        return {"error": "Invalid JSON", "raw": text}


# ---------------------------
# 🤖 AGENT LOGIC
# ---------------------------

def run_agent(user_input: str):

    prompt = f"""
    You are an AI CRM assistant.

    IMPORTANT:
    - Return ONLY valid JSON
    - Do NOT add explanation
    - Do NOT add text before or after JSON

    Format:
    {{
      "tool": "log_interaction",
      "data": {{
        "hcpName": "",
        "interactionType": "",
        "date": "",
        "time": "",
        "attendees": "",
        "topics": "",
        "outcomes": "",
        "followUps": "",
        "sentiment": ""
      }}
    }}

    Text:
    {user_input}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )

    content = response.choices[0].message.content

    # ✅ FIXED PARSING
    parsed = extract_json(content)

    if "error" in parsed:
        return parsed

    tool_name = parsed.get("tool")
    data = parsed.get("data", {})

    # ---------------------------
    # 🔧 TOOL ROUTER
    # ---------------------------

    if tool_name == "log_interaction":
        return log_interaction(data)

    elif tool_name == "edit_interaction":
        return edit_interaction(data)

    elif tool_name == "suggest_followup":
        return suggest_followup(data)

    elif tool_name == "summarize":
        return summarize_text(user_input)

    elif tool_name == "get_hcp":
        return get_hcp_details(data.get("hcpName"))

    else:
        return {"error": "Unknown tool", "raw": parsed}