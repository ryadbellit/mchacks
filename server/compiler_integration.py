import os
import requests
from dotenv import load_dotenv

load_dotenv()

COMPILER_KEY = os.getenv("ONE_COMPILER_KEY")
COMPILER_URL = os.getenv("COMPILER_URL")
extensions = {
    "python" : ".py",
    "javascript" : ".js",
    "typescript" : ".ts",
    "java" : ".java",
    "cpp" : ".cpp",
    "csharp" : ".cs"
}

def compile_code_logic(language, user_code):
    print(extensions[language])
    body = {
        "language": language,
        "stdin": "",
        "files": [
            {
                "name": "index" + extensions[language],
                "content": user_code
            }
        ]
    }
    headers = {
        "x-rapidapi-key": COMPILER_KEY,
        "x-rapidapi-host": "onecompiler-apis.p.rapidapi.com",
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(COMPILER_URL, json=body, headers=headers)
        response.raise_for_status()
        print(response.json())
        return response.json() # Retourne le dictionnaire Python
    except Exception as e:
        return {"error": str(e)}