import os
from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs
from elevenlabs.play import play

load_dotenv()

client = ElevenLabs(api_key=os.getenv("eleven_labs_api_key"))

# TTS

audio = client.text_to_speech.convert(
    text="i have a big bunda",
    voice_id="uYXf8XasLslADfZ2MB4u",
    model_id="eleven_multilingual_v2"
)

play(audio)


# STT