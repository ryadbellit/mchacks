import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

# Importations des SDKs
from elevenlabs.client import ElevenLabs
from elevenlabs.play import play
from google import genai

# 1. Configuration Initiale
load_dotenv() # Charge les clés ELEVENLABS_API_KEY et AI_API_KEY depuis le .env

app = Flask(__name__)
# On active CORS pour que votre frontend React (port 5173) puisse communiquer avec ce serveur
CORS(app) 

# 2. Initialisation des Clients API
eleven_client = ElevenLabs(api_key=os.getenv("ELEVENLABS_API_KEY"))
gemini_client = genai.Client(api_key=os.getenv("AI_API_KEY"))

# 3. Chargement du Prompt Système
def load_system_prompt():
    try:
        with open('prompt.txt', 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        return "Tu es un interviewer technique qui aide les étudiants de Polytechnique Montréal."

SYSTEM_PROMPT = load_system_prompt()

# --- LOGIQUE IA ---

def generate_ai_logic(prompt: str) -> str:
    """Communique avec l'API Gemini"""
    try:
        response = gemini_client.models.generate_content(
            model="gemini-3-flash-preview", # Utilisez un modèle stable
            contents=prompt,
            config={
                "temperature": 0.4,
                "max_output_tokens": 250,
                "system_instruction": SYSTEM_PROMPT # Notez le singulier 'system_instruction'
            }
        )
        return response.text
    except Exception as e:
        print(f"Erreur API Gemini : {e}")
        return "Désolé, j'ai eu une erreur lors du traitement de votre réponse."
    
def text_to_speech(ai_response: str):
    """Convertit le texte en audio avec ElevenLabs et joue l'audio"""
    try:
        audio = eleven_client.text_to_speech.convert(
            text=ai_response,
            voice_id="uYXf8XasLslADfZ2MB4u",
            model_id="eleven_multilingual_v2"
        )
        play(audio)
    except Exception as e:
        print(f"Erreur TTS ElevenLabs : {e}")

# 4. Lancement du Serveur
if __name__ == "__main__":
    # debug=True permet de voir les erreurs en direct et de recharger le code automatiquement
    app.run(port=5000, debug=True)