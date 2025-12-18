export default function ResultCard({ analysis }) {
  if (!analysis) return null;

  const getRiskClass = (level) => {
    switch (level?.toLowerCase()) {
      case 'low': return 'risk-low';
      case 'medium': return 'risk-medium';
      case 'high': return 'risk-high';
      default: return 'risk-unknown';
    }
  };

  const getRiskIcon = (level) => {
    switch (level?.toLowerCase()) {
      case 'low':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        );
      case 'medium':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        );
      case 'high':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        );
    }
  };

  const getScoreClass = (score) => {
    if (score > 66) return 'score-high';
    if (score > 33) return 'score-medium';
    return 'score-low';
  };

  return (
    <div className="result-card">
      {/* Risk Level Badge */}
      <div className={`risk-badge ${getRiskClass(analysis.riskLevel)}`}>
        <div className="risk-header">
          {getRiskIcon(analysis.riskLevel)}
          <h2 className="risk-title">Risk Level: {analysis.riskLevel}</h2>
        </div>
        <div className="risk-score-container">
          <div className="risk-score-label">
            <span>Risk Score</span>
            <span className={`score-value ${getScoreClass(analysis.riskScore)}`}>
              {analysis.riskScore}/100
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className={`progress-fill ${getScoreClass(analysis.riskScore)}`}
              style={{ width: `${analysis.riskScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Concerns Section */}
      {analysis.cons && analysis.cons.length > 0 && (
        <div className="concerns-card">
          <h3 className="concerns-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            Key Concerns
          </h3>
          <ul className="concerns-list">
            {analysis.cons.map((concern, i) => (
              <li key={i} className="concern-item">
                <span className="bullet">•</span>
                <span>{concern}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Summary Section */}
      {analysis.summary && (
        <div className="summary-card">
          <h3 className="summary-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            Analysis Summary
          </h3>
          <p className="summary-text">{analysis.summary}</p>
        </div>
      )}
    </div>
  );
}