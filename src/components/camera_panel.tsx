// CameraPanel.tsx - Minimalist version
import { Video, VideoOff, Mic, MicOff } from "lucide-react";
import {useState} from "react";
import "../css/components/camera_panel.css"; // renamed for clarity

export default function CameraPanel() {
  const [enableCam, setEnableCam] = useState<"enabled" | "disabled">("enabled");
  const [enableMic, setEnableMic] = useState<"enabled" | "disabled">("enabled");

  return (
    <div className="camera-panel">
      <div className="camera-header">
        <span>Camera</span>
      </div>

      <div className="camera-preview">
        <div className="preview-placeholder">
          Camera preview
        </div>
      </div>

      <div className="camera-controls">
        <button className="control-btn" onClick={() => setEnableCam(enableCam === "enabled" ? "disabled" : "enabled")}>
          {enableCam === "enabled" ? <Video size={20} /> : <VideoOff size={20} />}
          <span>Video</span>
        </button>

        <button className="control-btn" onClick={() => setEnableMic(enableMic === "enabled" ? "disabled" : "enabled")}>
          {enableMic === "enabled" ? <Mic size={20} /> : <MicOff size={20} />}
          <span>Mic</span>
        </button>
      </div>
    </div>
  );
}
