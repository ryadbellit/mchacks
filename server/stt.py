from flask import Flask, jsonify
from elevenlabs.client import ElevenLabs
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv() # Charge votre ELEVENLABS_API_KEY depuis le .env

app = Flask(__name__)
CORS(app) # Permet à React de communiquer avec Python sans erreur de sécurité

client = ElevenLabs(api_key=os.getenv("ELEVENLABS_API_KEY"))

@app.route('/scribe-token', methods=['GET'])
def get_scribe_token():
    try:
        # Génère le jeton à usage unique pour le STT (Scribe)
        response = client.tokens.single_use.create("realtime_scribe")
        return jsonify({"token": response.token})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000)