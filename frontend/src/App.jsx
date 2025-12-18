import { useState } from "react";
import UploadForm from "./components/UploadForm";
import ResultCard from "./components/ResultCard";
import "./App.css";

function App() {
  const [analysis, setAnalysis] = useState(null);

  return (
    <div className="app-container">
      <div className="app-wrapper">
        {/* Header */}
        <div className="header">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <h1 className="app-title">TrustLens</h1>
          <p className="app-subtitle">AI-Powered Financial Document Analysis</p>
          <p className="app-description">
            Upload your loan agreements and contracts for instant risk assessment
          </p>
        </div>

        {/* Main Content */}
        <div className="main-card">
          <UploadForm onResult={setAnalysis} />
          <ResultCard analysis={analysis} />
        </div>

        {/* Footer */}
        <div className="footer">
          Powered by Claude AI • Secure & Confidential Analysis
        </div>
      </div>
    </div>
  );
}

export default App;