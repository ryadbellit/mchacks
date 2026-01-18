import os
from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs
from elevenlabs.play import play
from gemini_integration import ai_response

load_dotenv()

client = ElevenLabs(api_key=os.getenv("ELEVENLABS_API_KEY"))

# TTS
audio = client.text_to_speech.convert(
    text=ai_response,
    voice_id="uYXf8XasLslADfZ2MB4u",
    model_id="eleven_multilingual_v2"
)

play(audio)