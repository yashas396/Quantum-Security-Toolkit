import MetricCard from "../UI/MetricCard";

function MetricsSection({ simulation, getStatusColor }) {
  return (
    <div className="metrics-grid">
      <MetricCard
        title="QBER"
        value={`${simulation.qber}%`}
        subtitle={`${simulation.errors} detected errors`}
        color="cyan"
      />

      <MetricCard
        title="Secret Key"
        value={`${simulation.key_length} Bits`}
        subtitle="Sifted key length"
        color="purple"
      />

      <MetricCard
        title="Match Rate"
        value={`${simulation.match_rate}%`}
        subtitle="Matching measurement bases"
        color="blue"
      />

      <MetricCard
        title="Channel"
        value={simulation.status}
        subtitle={
          simulation.status === "READY"
            ? "Waiting for simulation"
            : simulation.keys_match
            ? "Keys match successfully"
            : "Possible interception detected"
        }
        color={getStatusColor()}
      />
    </div>
  );
}

export default MetricsSection;