// CameraPanel.tsx - Minimalist version
import { Video, VideoOff, Mic, MicOff } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import "../css/components/camera_panel.css"; // renamed for clarity

export default function CameraPanel() {
  const [enableCam, setEnableCam] = useState<"enabled" | "disabled">("enabled");
  const [enableMic, setEnableMic] = useState<"enabled" | "disabled">("enabled");
  const [error, setError] = useState("");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: enableMic === "enabled"
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      setError("");
    } catch (err) {
      setError("Camera access denied or unavailable");
      setEnableCam("disabled");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const toggleCamera = () => {
    if (enableCam === "enabled") {
      stopCamera();
      setEnableCam("disabled");
    } else {
      setEnableCam("enabled");
    }
  };

  useEffect(() => {
    if (enableCam) {
      startCamera();
    }

    // Cleanup on unmount
    return () => {
      stopCamera();
    };
  }, [enableCam]);


  return (
    <div className="camera-panel">
      <div className="camera-header">
        <span>Camera</span>
      </div>

      <div className="camera-preview">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="camera-video"
            style={{ display: enableCam === "enabled" ? "block" : "none" }}
          />
      {enableCam === "disabled" && (
          <div className="preview-placeholder">
            <VideoOff size={48} />
            <span>Camera disabled</span>
          </div>
        )}
      </div>

      <div className="camera-controls">
        <button className="control-btn" onClick={() => toggleCamera()}>
          {enableCam === "enabled" ? <Video size={20} /> : <VideoOff size={20} />}
          <span>Video</span>
        </button>
      </div>
    </div>
  );
}
