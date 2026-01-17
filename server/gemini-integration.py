from google import genai
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)
load_dotenv()

client = genai.Client(api_key=os.getenv("AI_API_KEY"))
def generate_ai_logic(prompt: str) -> str:
    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents = prompt
    )
    return response.text


@app.route('/generate', methods=['POST'])
def handle_prompt():
    data = request.get_json()
    
    prompt = data.get('prompt')
    print(prompt)
    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400
    try :
        ai_response = generate_ai_logic(prompt)
        print(ai_response)
        return jsonify({"response": ai_response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)