import Chat from '../components/chat';
import CodeEditor from '../components/code_editor'
import CameraPanel from '../components/camera_panel';
import TestPanel from '../components/test_panel';
import { useEffect, useState } from 'react';

import "../css/pages/dashboard.css";

interface ParsedProblem {
  main_description: string[];
  examples: {
    number: number;
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  follow_up?: string;
}


interface ProblemData {
  question_id: string;
  title: string;
  difficulty: string;
  parsed_description: ParsedProblem;
}

export default function Dashboard() {
  const [problemData, setProblemData] = useState<ProblemData | null>(null);
  const [problemLoading, setProblemLoading] = useState(true);
  useEffect(() => {
    const fetchProblem = async (problemId: number) => {
      try {
        setProblemLoading(true);
        const response = await fetch(`http://localhost:5000/api/get-problem/${problemId}`);
        if (!response.ok) throw new Error('Failed to fetch problem');
        const data = await response.json();
        setProblemData(data);
      } catch (error) {
        console.error('Error fetching problem:', error);
      } finally {
        setProblemLoading(false);
      }
    };

    fetchProblem(4); // Charge le problème 1 par défaut
  }, []);
  return (
    <>
      <main>
        <div className="component-wrapper chat-wrapper">
          <Chat problemData={problemData} problemLoading={problemLoading} />
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