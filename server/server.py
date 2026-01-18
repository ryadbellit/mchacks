
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from gemini_integration import generate_ai_logic, text_to_speech, eleven_client
from compiler_integration import compile_code_logic
from database import problems_collection


# Gemini et ElevenLabs imports
import os
from elevenlabs.client import ElevenLabs
from elevenlabs.play import play


app = Flask(__name__)
CORS(app)

load_dotenv()


@app.route("/compile", methods=["POST"])
def handle_compile():
    data = request.get_json()
    language = data.get("language")
    user_code = data.get("code")
    
    if not user_code:
        return jsonify({"error": "No code provided"}), 400

    result = compile_code_logic(language, user_code)
    
    return jsonify(result)

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
        text_to_speech(ai_response)
        return jsonify({"response": ai_response})
    
        
    return jsonify({"error": "No transcript provided"}), 400

@app.route('/api/get-problem/<problem_id>', methods=['GET'])
def get_problem(problem_id):
    try:
        print(problem_id)
        print(f"Recherche du problème: {problem_id}")
        
        problem = problems_collection.find_one({
            "$or": [
                {"question_id": problem_id},      # String
                {"question_id": int(problem_id)}  # Int
            ]
        })

        print(problem)
        
        print(f"Problème trouvé: {problem is not None}")
        
        if problem:
            problem['_id'] = str(problem['_id'])
            return jsonify(problem), 200
        else:
            return jsonify({"error": "Problème non trouvé"}), 404
    except Exception as e:
        print(f"Erreur: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)