import { useState } from 'react';
import { Play } from 'lucide-react';
import { useTestPanel } from '../context/TestPanelContext';
import '../css/components/run_button.css';

export default function RunButton() {
  const { testPanelRef } = useTestPanel();
  const [isCompiling, setIsCompiling] = useState(false);
  const [output, setOutput] = useState('');

  const handleCompile = async () => {
    // Get code and language from Monaco Editor via window methods
    const code = (window as any).getEditorCode?.();
    const language = (window as any).getEditorLanguage?.();
    console.log(code);
    console.log(language);
    if (!code || !code.trim()) {
      setOutput('Error: No code to compile');
      return;
    }

    setIsCompiling(true);
    setOutput('Compiling...');

    try {
      const response = await fetch('http://localhost:5000/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: language,
          code: code,
        }),
      });

      const result = await response.json();
      
      if (result.error) {
        setOutput(`Error: ${result.error}`);
      } else {
        // Format the output based on the API response structure
        const outputText = result.stdout || result.output || JSON.stringify(result, null, 2);
        setOutput(outputText);
        
        // Call getComputedTests from test panel
        testPanelRef?.current?.getComputedTests();
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Failed to compile'}`);
    } finally {
      setIsCompiling(false);
    }
  };

  return (
    <div className="compile-container">
      <button 
        onClick={handleCompile} 
        disabled={isCompiling}
        className="run-btn btn"
      >
        <Play size={16} /> {isCompiling ? 'Running...' : 'Run'}
      </button>
    </div>
  );
}