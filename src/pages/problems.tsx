import { useState, useEffect } from 'react';
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

function ProblemsPage() {

  const navigate = useNavigate();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const fetchedProblems: Problem[] = [];
        
        for(let n = 1; n < 10; n++){
          const currentFetch = await fetch(`http://localhost:5000/api/get-problem/${n}`);
          if (!currentFetch.ok) throw new Error('Failed to fetch problem');
          const data = await currentFetch.json();
          data.id = n;
          fetchedProblems.push(data);
        }
        
        setProblems(fetchedProblems);
        
        // Afficher le premier problème automatiquement
        if (fetchedProblems.length > 0) {
          setSelectedProblem(fetchedProblems[0]);
        }
        
      } catch (error) {
        console.error('Error fetching problems:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const handleRandomProblem = () => {
    if (problems.length === 0) return;
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

  if (loading) {
    return (
      <main className="problems-container">
        <div className="problems-content">
          <p>Chargement des problèmes...</p>
        </div>
      </main>
    );
  }

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
              <button className="start-problem-btn" onClick={()=>{navigate(`/dashboard/${selectedProblem.id}`);
                                        console.log(selectedProblem.id)}}>Start Interview</button>
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