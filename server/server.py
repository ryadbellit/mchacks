
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from gemini_integration import generate_ai_logic
from compiler_integration import compile_code_logic

app = Flask(__name__)
CORS(app)

load_dotenv()

@app.route('/generate', methods=['POST'])
def handle_prompt():
    data = request.get_json()
    
    prompt = data.get('prompt')
    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400
    try :
        ai_response = generate_ai_logic(prompt)
        return jsonify({"response": ai_response})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/compile", methods=["POST"])
def handle_compile():
    data = request.get_json()
    user_code = data.get("code")
    
    if not user_code:
        return jsonify({"error": "No code provided"}), 400

    result = compile_code_logic(user_code)
    
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)