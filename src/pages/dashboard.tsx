import Chat from '../components/chat';
import CodeEditor from '../components/code_editor'
import CameraPanel from '../components/camera_panel';
import TestPanel from '../components/test_panel';
import { useParams } from "react-router-dom";

import "../css/pages/dashboard.css";

export default function Dashboard() {
  const { problemId } = useParams<{ problemId: string }>();
  

  return (
    <>
      <main>
        <div className="component-wrapper chat-wrapper">
          <Chat />
        </div>
        <div className="component-wrapper codeblock-wrapper">
          <CodeEditor />
        </div>
        <div className="sidebar-column">
          <div className="component-wrapper">
            <CameraPanel />
          </div>
          <div className="component-wrapper">
            <TestPanel />
          </div>
        </div>
      </main>
    </>
  );
}