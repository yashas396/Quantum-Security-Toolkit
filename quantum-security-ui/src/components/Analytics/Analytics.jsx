import "./Analytics.css";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Analytics({ simulation, history }) {
  const correctBits = Math.max(
    simulation.key_length - simulation.errors,
    0
  );

  const pieData = [
    {
      name: "Correct",
      value: correctBits,
    },
    {
      name: "Errors",
      value: simulation.errors,
    },
  ];

  const COLORS = ["#00F5D4", "#FF4D6D"];

  const securityScore = Math.max(
    0,
    Math.round(100 - simulation.qber * 2)
  );

  return (
    <section className="analytics-section">

      <h2>Quantum Analytics</h2>

      <div className="analytics-grid">

        <div className="analytics-card">

          <h3>QBER History</h3>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="run" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="qber"
                stroke="#00F5D4"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

        <div className="analytics-card">

          <h3>Error Distribution</h3>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

            </PieChart>
          </ResponsiveContainer>

        </div>

        <div className="analytics-card">

          <h3>Security Score</h3>

          <div className="score-circle">
            {securityScore}
          </div>

          <p>
            {securityScore > 75
              ? "Secure Channel"
              : securityScore > 40
              ? "Suspicious"
              : "Compromised"}
          </p>

        </div>

        <div className="analytics-card">

          <h3>AI Security Analysis</h3>

          {simulation.qber < 15 ? (
            <>
              <p className="success">
                ✔ Secure transmission detected.
              </p>

              <p>
                Generated key can safely be used.
              </p>
            </>
          ) : (
            <>
              <p className="danger">
                ⚠ Possible eavesdropping detected.
              </p>

              <p>
                Discard the generated key and
                repeat the BB84 protocol.
              </p>
            </>
          )}

        </div>

      </div>

    </section>
  );
}

export default Analytics;