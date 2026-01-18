import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../css/pages/problems.css';

interface Problem {
  id: number;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  acceptance: string;
  solved: boolean;
}

const problems: Problem[] = [
  { id: 1, title: 'Two Sum', category: 'Array', difficulty: 'Easy', acceptance: '49.2%', solved: true },
  { id: 2, title: 'Add Two Numbers', category: 'Linked List', difficulty: 'Medium', acceptance: '42.1%', solved: false },
  { id: 3, title: 'Longest Substring Without Repeating Characters', category: 'String', difficulty: 'Medium', acceptance: '35.8%', solved: false },
  { id: 4, title: 'Median of Two Sorted Arrays', category: 'Array', difficulty: 'Hard', acceptance: '38.4%', solved: false },
  { id: 5, title: 'Longest Palindromic Substring', category: 'String', difficulty: 'Medium', acceptance: '33.2%', solved: true },
  { id: 6, title: 'Reverse Integer', category: 'Math', difficulty: 'Easy', acceptance: '27.5%', solved: true },
  { id: 7, title: 'String to Integer (atoi)', category: 'String', difficulty: 'Medium', acceptance: '16.8%', solved: false },
  { id: 8, title: 'Palindrome Number', category: 'Math', difficulty: 'Easy', acceptance: '54.2%', solved: true },
  { id: 9, title: 'Regular Expression Matching', category: 'String', difficulty: 'Hard', acceptance: '27.9%', solved: false },
  { id: 10, title: 'Container With Most Water', category: 'Array', difficulty: 'Medium', acceptance: '54.1%', solved: false },
  { id: 11, title: 'Integer to Roman', category: 'Math', difficulty: 'Medium', acceptance: '61.8%', solved: false },
  { id: 12, title: 'Roman to Integer', category: 'Math', difficulty: 'Easy', acceptance: '58.7%', solved: true },
  { id: 13, title: 'Longest Common Prefix', category: 'String', difficulty: 'Easy', acceptance: '41.2%', solved: false },
  { id: 14, title: '3Sum', category: 'Array', difficulty: 'Medium', acceptance: '33.8%', solved: false },
  { id: 15, title: 'Letter Combinations of a Phone Number', category: 'String', difficulty: 'Medium', acceptance: '57.4%', solved: false },
];

function ProblemsPage() {

  const navigate = useNavigate();

  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  const handleRandomProblem = () => {
    const randomIndex = Math.floor(Math.random() * problems.length);
    setSelectedProblem(problems[randomIndex]);
  };

  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'difficulty-easy';
      case 'Medium':
        return 'difficulty-medium';
      case 'Hard':
        return 'difficulty-hard';
      default:
        return '';
    }
  };

  return (
    <main className="problems-container">
      <div className="problems-content">
        <div className="problems-header">
          <h1>Problems</h1>
          <p className="problems-subtitle">Practice coding problems with AI-powered interviews</p>
        </div>

        <div className="random-problem-section">
          <button className="random-problem-btn" onClick={handleRandomProblem}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
            </svg>
            Random Problem
          </button>
          
          {selectedProblem && (
            <div className="selected-problem-card">
              <div className="selected-problem-header">
                <h3>{selectedProblem.title}</h3>
                <span className={`difficulty-badge ${getDifficultyClass(selectedProblem.difficulty)}`}>
                  {selectedProblem.difficulty}
                </span>
              </div>
              <div className="selected-problem-info">
                <span className="problem-category">{selectedProblem.category}</span>
                <span className="problem-acceptance">Acceptance: {selectedProblem.acceptance}</span>
              </div>
              <button className="start-problem-btn" onClick={()=>navigate(`/dashboard/${selectedProblem.id}`)}>Start Interview</button>
            </div>
          )}
        </div>

        <div className="problems-table-container">
          <table className="problems-table">
            <thead>
              <tr>
                <th className="col-status">STATUS</th>
                <th className="col-title">TITLE</th>
                <th className="col-category">CATEGORY</th>
                <th className="col-difficulty">DIFFICULTY</th>
                <th className="col-acceptance">ACCEPTANCE</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem) => (
                <tr key={problem.id} className="problem-row" onClick={()=>navigate(`/dashboard/${problem.id}`)}>
                  <td className="col-status">
                    <div className={`status-icon ${problem.solved ? 'status-solved' : 'status-unsolved'}`}>
                      {problem.solved && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                  </td>
                  <td className="col-title">
                    <span className="problem-title">{problem.title}</span>
                  </td>
                  <td className="col-category">
                    <span className="problem-category-text">{problem.category}</span>
                  </td>
                  <td className="col-difficulty">
                    <span className={`difficulty-badge ${getDifficultyClass(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="col-acceptance">
                    <span className="acceptance-text">{problem.acceptance}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default ProblemsPage;