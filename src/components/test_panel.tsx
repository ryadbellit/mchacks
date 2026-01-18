// TestResults.tsx
import { Check, Clock } from "lucide-react";
import { useImperativeHandle, forwardRef, useState } from "react";
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

export interface TestPanelHandle {
  getComputedTests: () => void;
}

const TestResults = forwardRef<TestPanelHandle, {problemData: any}>(({problemData}, ref) => {

  const [testCases, setTestCases] = useState<TestCase[]>([]);
 const testCaseFormat: TestCase[] = [
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
    status: "passed",
    input: "[1,5,3,7], 12",
    output: "[2,3]",
    expected: "[2,3]",
    time: "3ms",
    memory: "42.1 MB"
  },
  {
    id: 5,
    name: "Test Case 5",
    status: "passed",
    input: "[0,4,3,0], 0",
    output: "[0,3]",
    expected: "[0,3]",
    time: "2ms",
    memory: "41.5 MB"
  },
  {
    id: 6,
    name: "Test Case 6",
    status: "passed",
    input: "[-1,-2,-3,-4,-5], -8",
    output: "[2,4]",
    expected: "[2,4]",
    time: "2ms",
    memory: "41.0 MB"
  },
  {
    id: 7,
    name: "Test Case 7",
    status: "passed",
    input: "[10,20,30,40,50], 90",
    output: "[3,4]",
    expected: "[3,4]",
    time: "1ms",
    memory: "40.7 MB"
  },
  {
    id: 8,
    name: "Test Case 8",
    status: "passed",
    input: "[1,2,3,4,5,6,7,8,9], 17",
    output: "[7,8]",
    expected: "[7,8]",
    time: "3ms",
    memory: "42.3 MB"
  },
  {
    id: 9,
    name: "Test Case 9",
    status: "passed",
    input: "[5,5], 10",
    output: "[0,1]",
    expected: "[0,1]",
    time: "1ms",
    memory: "40.6 MB"
  },
  {
    id: 10,
    name: "Test Case 10",
    status: "passed",
    input: "[100,200,300,400], 700",
    output: "[2,3]",
    expected: "[2,3]",
    time: "2ms",
    memory: "41.8 MB"
  }
];

  function getComputedTests() {
    setTestCases(testCaseFormat);
  }

  useImperativeHandle(ref, () => ({
    getComputedTests,
  }));

  const passedTests = testCases.filter(t => t.status === "passed").length;
  const totalTests = testCases.length;
  const successRate = Math.round((passedTests / totalTests) * 100) ;

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
        <span className={`success-rate ${successRate >= 60 ? 'green-success-rate' : 'red-success-rate'}`}>{successRate ? successRate : 0}% success rate</span>
      </div>
    </div>
  );
});

TestResults.displayName = "TestResults";

export default TestResults;