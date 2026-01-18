import os
import requests
from dotenv import load_dotenv
from database import problems_collection

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

def compile_code_logic(language, user_code, prob_id):
    problem = problems_collection.find_one({"question_id": prob_id})
    
    test_code = """
    \n\nsolution = Solution()
test_cases = [121, -121, 10, 0, 12321]
for test in test_cases:
    result = solution.isPalindrome(test)
    print(f'Input: {test}, Output: {result}')
    """

    print(test_code)
    user_code += test_code    

    body = {
        "language": language,
        "stdin": '',
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