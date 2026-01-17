import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

URL = "https://onecompiler-apis.p.rapidapi.com/api/v1/run"

app = Flask(__name__)
CORS(app)

load_dotenv()
COMPILER_KEY = os.getenv("ONE_COMPILER_KEY")

@app.route("/compile", methods=["POST"])
def compile_code():
    data = request.get_json().get("code")
    body = {
        "language" : "python",
        "stdin" : "Ryad",
        "files" : [
            {
                "name" : "index.py",
                "content": data
            }
        ]
    }
    headers = {
        "x-rapidapi-key" : COMPILER_KEY,
        "x-rapidapi-host": "onecompiler-apis.p.rapidapi.com",
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(URL, json=body, headers=headers)
        response.raise_for_status() # Vérifie si la requête a réussi
        
        result = response.json()
        
        print(result)

    except requests.exceptions.HTTPError as err:
        print(f"Erreur HTTP : {err}")
    except Exception as e:
        print(f"Une erreur est survenue : {e}")

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)