import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

# Importations des SDKs
from elevenlabs.client import ElevenLabs
from elevenlabs.play import play
from google import genai
from google.genai import types

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

# --- ROUTES ---

@app.route('/scribe-token', methods=['GET'])
def get_scribe_token():
    """Génère le jeton à usage unique pour ElevenLabs STT"""
    try:
        # En Python, on utilise usage_category au lieu de action
        response = eleven_client.tokens.single_use.create("realtime_scribe")
        return jsonify({"token": response.token})
    except Exception as e:
        print(f"Erreur ElevenLabs : {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/process-transcript', methods=['POST'])
def process_transcript():
    """Reçoit le texte du frontend et demande une réponse à Gemini"""
    # Extraction sécurisée des données JSON
    data = request.get_json()
    if not data:
        return jsonify({"error": "JSON requis"}), 400
        
    transcript = data.get('transcript')
    
    if transcript:
        ai_response = generate_ai_logic(transcript)
        print("AI Response:", ai_response)
        return jsonify({"response": ai_response})
    
        
    return jsonify({"error": "No transcript provided"}), 400

# --- LOGIQUE IA ---

def generate_ai_logic(prompt: str) -> str:
    """Communique avec l'API Gemini"""
    try:
        response = gemini_client.models.generate_content(
            model="gemini-2.0-flash", # Utilisez un modèle stable
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.4, 
                max_output_tokens=250,
                system_instruction=SYSTEM_PROMPT # Notez le singulier 'system_instruction'
            )
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