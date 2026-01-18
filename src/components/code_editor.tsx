import { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import '../css/components/code_editor.css';

export default function MonacoEditor({ problemData }: { problemData: any }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    if (!editorRef.current) return;

    // Initialize Monaco Editor
    monacoInstance.current = monaco.editor.create(editorRef.current, {
      value: '',
      language: language,
      theme: 'vs-dark',
      automaticLayout: true,
      fontSize: 14,
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      tabSize: 2,
    });

    // Cleanup on unmount
    return () => {
      monacoInstance.current?.dispose();
    };
  }, []);

  // Update language when changed
  useEffect(() => {
    if (monacoInstance.current) {
      const model = monacoInstance.current.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, language);
      }
    }
  }, [language]);

  // Expose methods to get code and language on window object
  useEffect(() => {
    (window as any).getEditorCode = () => {
      return monacoInstance.current?.getValue() || '';
    };
    (window as any).getEditorLanguage = () => {
      return language;
    };
  }, [language]);


  // Update editor content when problemData changes
  useEffect(() => {
    if (monacoInstance.current && problemData?.starter_code) {
      monacoInstance.current.setValue(problemData.starter_code);
    }
  }, [problemData]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="monaco-editor-container">
      <div className="monaco-header">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="monaco-language-select"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="csharp">C#</option>
        </select>
      </div>
      <div ref={editorRef} className="monaco-editor-wrapper" />
    </div>
  );
}