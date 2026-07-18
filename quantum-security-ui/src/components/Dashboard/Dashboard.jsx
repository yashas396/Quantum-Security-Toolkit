import { useState } from "react";

import { runSimulation } from "../../api/quantumApi";

import Hero from "../Hero/Hero";
import MetricsSection from "../Metrics/MetricsSection";
import KeysSection from "../Keys/KeysSection";
import SummarySection from "../Summary/SummarySection";
import ProtocolFlow from "../Protocol/ProtocolFlow";
import Analytics from "../Analytics/Analytics";
import Footer from "../Footer/Footer";

import "./Dashboard.css";

function Dashboard() {
  const [simulation, setSimulation] = useState({
    qber: "0.00",
    errors: 0,
    key_length: 0,
    match_rate: 0,
    keys_match: true,
    status: "READY",
    alice_key: "",
    bob_key: "",
  });

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSimulation = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await runSimulation();

      const updatedSimulation = {
        ...data,
        qber: Number(data.qber ?? 0).toFixed(2),
        errors: Number(data.errors ?? 0),
        key_length: Number(data.key_length ?? 0),
        match_rate: Number(data.match_rate ?? 0),
        keys_match: Boolean(data.keys_match),
        status: data.status ?? "READY",
        alice_key: data.alice_key ?? "",
        bob_key: data.bob_key ?? "",
      };

      setSimulation(updatedSimulation);

      setHistory((previousHistory) => [
        ...previousHistory,
        {
          run: previousHistory.length + 1,
          qber: Number(data.qber ?? 0),
          errors: Number(data.errors ?? 0),
          keyLength: Number(data.key_length ?? 0),
          matchRate: Number(data.match_rate ?? 0),
        },
      ]);
    } catch (err) {
      console.error("Simulation error:", err);

      setError(
        "The simulation service is temporarily unavailable. Please try again shortly."
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = () => {
    switch (simulation.status?.toUpperCase()) {
      case "SECURE":
        return "green";

      case "SUSPICIOUS":
        return "orange";

      case "COMPROMISED":
        return "red";

      default:
        return "blue";
    }
  };

  return (
    <section className="dashboard">
      <Hero
        onRunSimulation={handleSimulation}
        loading={loading}
      />

      {error && (
        <div className="dashboard-error" role="alert">
          {error}
        </div>
      )}

      <MetricsSection
        simulation={simulation}
        getStatusColor={getStatusColor}
      />

      <KeysSection simulation={simulation} />

      <SummarySection simulation={simulation} />

      <ProtocolFlow simulation={simulation} />

      <Analytics
        simulation={simulation}
        history={history}
      />

      <Footer />
    </section>
  );
}

export default Dashboard;