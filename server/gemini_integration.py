from google import genai, types
import os
from dotenv import load_dotenv


load_dotenv()
client = genai.Client(api_key=os.getenv("AI_API_KEY"))

def load_system_prompt():
    with open('prompt.txt', 'r', encoding='utf-8') as f:
        return f.read()

SYSTEM_PROMPT = load_system_prompt()

ai_response = None

def generate_ai_logic(prompt: str) -> str:
    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents = prompt,
        config=types.GenerateContentConfig(
            temperature=0.4, 
            max_output_tokens=250,
            system_instructions=SYSTEM_PROMPT
            )
    )
    ai_response = response.text
    return ai_response

