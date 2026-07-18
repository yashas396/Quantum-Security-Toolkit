function SummarySection({ simulation }) {
  return (
    <div className="simulation-summary">
      <h2>Simulation Summary</h2>

      <div className="summary-grid">
        <div className="summary-item">
          <span>Detected Errors</span>
          <strong>{simulation.errors}</strong>
        </div>

        <div className="summary-item">
          <span>Keys Match</span>
          <strong>
            {simulation.status === "READY"
              ? "PENDING"
              : simulation.keys_match
              ? "YES"
              : "NO"}
          </strong>
        </div>

        <div className="summary-item">
          <span>Eavesdropping Status</span>
          <strong>{simulation.status}</strong>
        </div>
      </div>
    </div>
  );
}

export default SummarySection;