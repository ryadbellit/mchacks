import React from "react";
import { useScribe } from "@elevenlabs/react";

// On définit des interfaces pour éviter les erreurs "implicitly has any type"
interface Transcript {
  id: string;
  text: string;
}

const STTComponent: React.FC = () => {
  const scribe = useScribe({
    modelId: "scribe_v2_realtime",
    // Utilisation de types explicites pour calmer TypeScript
    onPartialTranscript: (data: { text: string }) => {
      console.log("Transcription partielle :", data.text);
    },
    onCommittedTranscript: (data: { text: string }) => {
      console.log("Transcription finale :", data.text);
      // C'est ici que vous pourriez envoyer data.text à votre IA backend
      postTranscriptToServer(data.text);
    },
  });

  const handleStart = async () => {
    try {
      // Récupération du jeton sécurisé depuis votre API Python
      const token = await fetchTokenFromServer();

      if (!token) {
        throw new Error("Impossible de récupérer le jeton");
      }

      await scribe.connect({
        token,
        microphone: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  const handleValidate = async () => {
    // Cette fonction force le passage de "partial" à "committed"
    await scribe.commit(); 
    await new Promise(resolve => setTimeout(resolve, 500));
    scribe.disconnect();
    console.log("Validation manuelle demandée.");
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>Entraînement Vocal</h3>
      
      <div style={{ marginBottom: "15px" }}>
        <button 
          onClick={handleStart} 
          disabled={scribe.isConnected}
          style={{ marginRight: "10px", padding: "10px", backgroundColor: "#4CAF50", color: "white" }}
        >
          {scribe.isConnected ? "Enregistrement..." : "Démarrer l'interview"}
        </button>

        <button 
          onClick={handleValidate} 
          disabled={!scribe.isConnected}
          style={{ padding: "10px", backgroundColor: "#f44336", color: "white" }}
        >
          Arrêter
        </button>
      </div>

      {/* Affichage du texte en temps réel */}
      {scribe.partialTranscript && (
        <p style={{ color: "gray", fontStyle: "italic" }}>
          En train de parler : {scribe.partialTranscript}
        </p>
      )}

      <div style={{ marginTop: "20px", textAlign: "left" }}>
        <strong>Historique de la conversation :</strong>
        {scribe.committedTranscripts.map((t: Transcript) => (
          <p key={t.id} style={{ borderBottom: "1px solid #eee", padding: "5px 0" }}>
            {t.text}
          </p>
        ))}
      </div>
    </div>
  );
};

// Fonction pour communiquer avec votre serveur Flask/FastAPI
async function fetchTokenFromServer(): Promise<string | null> {
  try {
    // Port 5000 par défaut pour Flask
    const response = await fetch("http://localhost:5000/scribe-token");
    const data = await response.json();
    return data.token; // Doit correspondre à la clé renvoyée par Python
  } catch (error) {
    console.error("Erreur backend :", error);
    return null;
  }
}

async function postTranscriptToServer(transcript: string): Promise<void> {
  try {
    await fetch("http://localhost:5000/process-transcript", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transcript }),
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi du transcript au serveur :", error);
  }
}

export default STTComponent;