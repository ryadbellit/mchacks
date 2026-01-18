// TestResults.tsx
import { Check, Clock } from "lucide-react";
import "../css/components/test_panel.css";

interface TestCase {
  id: number;
  name: string;
  status: "passed" | "failed";
  input: string;
  output: string;
  expected: string;
  time: string;
  memory: string;
}

export default function TestResults({problemData}: {problemData: any}) {
  const testCases: TestCase[] = [
    {

      
      id: 1,
      name: "Test Case 1",
      status: "passed",
      input: "[2,7,11,15], 9",
      output: "[0,1]",
      expected: "[0,1]",
      time: "2ms",
      memory: "41.2 MB"
    },
    {
      id: 2,
      name: "Test Case 2",
      status: "passed",
      input: "[3,2,4], 6",
      output: "[1,2]",
      expected: "[1,2]",
      time: "1ms",
      memory: "40.8 MB"
    },
    {
      id: 3,
      name: "Test Case 3",
      status: "passed",
      input: "[3,3], 6",
      output: "[0,1]",
      expected: "[0,1]",
      time: "1ms",
      memory: "40.5 MB"
    },
    {
      id: 4,
      name: "Test Case 4",
      status: "failed",
      input: "[1,5,3,7], 12",
      output: "[1,3]",
      expected: "[2,3]",
      time: "3ms",
      memory: "42.1 MB"
    }
  ];

  const passedTests = testCases.filter(t => t.status === "passed").length;
  const totalTests = testCases.length;
  const successRate = Math.round((passedTests / totalTests) * 100);

  return (
    <div className="test-results-panel">
      <div className="test-results-header">
        <h2>Test Results</h2>
      </div>

      <div className="test-results-content">
        {testCases.map((test) => (
          <div key={test.id} className="test-case">
            <div className="test-case-header">
              <div className="test-case-title">
                <Check size={18} className="check-icon" />
                <span>{test.name}</span>
              </div>
              <span className={`test-status ${test.status}`}>
                {test.status === "passed" ? "Passed" : "Failed"}
              </span>
            </div>

            <div className="test-case-details">
              <div className="detail-row">
                <span className="detail-label">Input:</span>
                <span className="detail-value">{test.input}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Output:</span>
                <span className="detail-value">{test.output}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Expected:</span>
                <span className="detail-value">{test.expected}</span>
              </div>
            </div>

            <div className="test-metrics">
              <div className="metric">
                <Clock size={14} />
                <span>{test.time}</span>
              </div>
              <div className="metric">
                <span>Memory: {test.memory}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="test-summary">
        <span>Tests: {passedTests}/{totalTests} passed</span>
        <span className="success-rate">{successRate}% success rate</span>
      </div>
    </div>
  );
}