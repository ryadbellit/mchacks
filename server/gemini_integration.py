import os
from elevenlabs.client import ElevenLabs
from elevenlabs.play import play
from google import genai
from dotenv import load_dotenv

load_dotenv()

# Initialisation
eleven_client = ElevenLabs(api_key=os.getenv("ELEVENLABS_API_KEY"))
gemini_client = genai.Client(api_key=os.getenv("AI_API_KEY"))

def load_system_prompt():
    try:
        with open('prompt.txt', 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        return "Tu es un interviewer technique qui aide les étudiants."


def generate_ai_logic(user_prompt: str, problem_context=None) -> str:
    """Communique avec Gemini en incluant le contexte du problème actuel"""
    
    # On construit l'instruction système dynamiquement
    base_prompt = load_system_prompt()
    context_instruction = ""
    
    if problem_context:
        context_instruction = f"\n\nL'utilisateur travaille actuellement sur ce problème : {problem_context}"

    try:
        # On crée une session à chaque fois ou on utilise une session globale 
        # mais on injecte le contexte dans le message
        full_instruction = base_prompt + context_instruction
        
        # Utilisation de l'API Gemini avec instructions système
        response = gemini_client.models.generate_content(
            model="gemini-2.0-flash", # Version stable recommandée
            contents=user_prompt,
            config={
                "system_instruction": full_instruction,
                "temperature": 0.4,
            }
        )
        return response.text
    except Exception as e:
        print(f"Erreur API Gemini : {e}")
        return "Désolé, j'ai eu une erreur lors du traitement."

def text_to_speech(ai_response: str):
    try:
        audio = eleven_client.text_to_speech.convert(
            text=ai_response,
            voice_id="uYXf8XasLslADfZ2MB4u",
            model_id="eleven_multilingual_v2"
        )
        play(audio)
    except Exception as e:
        print(f"Erreur TTS ElevenLabs : {e}")