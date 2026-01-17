from google import genai
import os
from dotenv import load_dotenv

load_dotenv()
client = genai.Client(api_key=os.getenv("AI_API_KEY"))

def generate_ai_logic(prompt: str) -> str:
    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents = prompt
    )
    return response.text

