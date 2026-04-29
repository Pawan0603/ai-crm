import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def extract_interaction_data(user_input: str):
    prompt = f"""
    Extract structured CRM data from this text.

    Return ONLY valid JSON:
    {{
      "hcpName": "",
      "interactionType": "",
      "date": "",
      "time": "",
      "attendees": "",
      "topics": "",
      "outcomes": "",
      "followUp": "",
      "sentiment": ""
    }}

    Text:
    {user_input}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    content = response.choices[0].message.content

    try:
        return json.loads(content)
    except:
        return {
            "error": "Invalid JSON",
            "raw": content
        }