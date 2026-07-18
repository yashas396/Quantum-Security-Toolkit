import { motion } from "framer-motion";
import {
  FaUserAstronaut,
  FaSatelliteDish,
  FaUserSecret,
  FaShieldAlt,
} from "react-icons/fa";

import "./ProtocolFlow.css";

function ProtocolNode({ icon, title, subtitle, type }) {
  return (
    <motion.div
      className={`protocol-node protocol-node-${type}`}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="protocol-node-icon">{icon}</div>

      <div className="protocol-node-content">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </motion.div>
  );
}

function PhotonChannel({ compromised }) {
  const photons = Array.from({ length: 6 });

  return (
    <div
      className={`photon-channel ${
        compromised ? "photon-channel-danger" : ""
      }`}
    >
      <div className="channel-line" />

      {photons.map((_, index) => (
        <motion.span
          key={index}
          className="photon"
          initial={{ left: "0%" }}
          animate={{ left: "100%" }}
          transition={{
            duration: 3,
            delay: index * 0.45,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <span className="channel-label">Quantum Channel</span>
    </div>
  );
}

function ProtocolFlow({ simulation }) {
  const compromised =
    simulation?.status?.toUpperCase() === "COMPROMISED";

  const evePresent =
    simulation?.eve_present ??
    compromised;

  return (
    <motion.section
      className="protocol-flow"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="protocol-heading">
        <div>
          <span className="protocol-kicker">LIVE PROTOCOL</span>

          <h2>BB84 Quantum Transmission</h2>

          <p>
            Watch how Alice prepares quantum states, photons travel through
            the channel, and Bob measures the received qubits.
          </p>
        </div>

        <div
          className={`protocol-status ${
            compromised
              ? "protocol-status-danger"
              : "protocol-status-safe"
          }`}
        >
          <span className="protocol-status-dot" />

          {compromised ? "Threat detected" : "Channel protected"}
        </div>
      </div>

      <div className="protocol-desktop-flow">
        <ProtocolNode
          icon={<FaUserAstronaut />}
          title="Alice"
          subtitle="Generates random bits and bases"
          type="alice"
        />

        <PhotonChannel compromised={compromised} />

        <motion.div
          className={`eve-monitor ${
            evePresent ? "eve-active" : "eve-inactive"
          }`}
          animate={
            evePresent
              ? {
                  y: [0, -7, 0],
                  boxShadow: [
                    "0 0 15px rgba(255, 77, 115, 0.15)",
                    "0 0 35px rgba(255, 77, 115, 0.45)",
                    "0 0 15px rgba(255, 77, 115, 0.15)",
                  ],
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <div className="eve-icon">
            <FaUserSecret />
          </div>

          <strong>Eve</strong>

          <span>
            {evePresent ? "Intercepting photons" : "No interception"}
          </span>

          {evePresent && <div className="eve-beam" />}
        </motion.div>

        <PhotonChannel compromised={compromised} />

        <ProtocolNode
          icon={<FaSatelliteDish />}
          title="Bob"
          subtitle="Measures photons using random bases"
          type="bob"
        />
      </div>

      <div className="protocol-result-grid">
        <div className="protocol-result-card">
          <span>Transmission</span>
          <strong>
            {simulation ? "Completed" : "Waiting"}
          </strong>
        </div>

        <div className="protocol-result-card">
          <span>Eavesdropper</span>
          <strong className={evePresent ? "danger-text" : "safe-text"}>
            {evePresent ? "Detected" : "Not detected"}
          </strong>
        </div>

        <div className="protocol-result-card">
          <span>QBER</span>
          <strong>
            {simulation ? `${simulation.qber}%` : "0%"}
          </strong>
        </div>

        <div className="protocol-result-card">
          <span>Security decision</span>
          <strong className={compromised ? "danger-text" : "safe-text"}>
            {simulation
              ? compromised
                ? "Discard key"
                : "Accept key"
              : "Pending"}
          </strong>
        </div>
      </div>

      <div
        className={`security-message ${
          compromised
            ? "security-message-danger"
            : "security-message-safe"
        }`}
      >
        <FaShieldAlt />

        <div>
          <strong>
            {simulation
              ? compromised
                ? "Quantum channel compromised"
                : "Quantum channel appears secure"
              : "Run a simulation to analyse the channel"}
          </strong>

          <p>
            {simulation
              ? compromised
                ? "The measured error rate suggests that the transmitted key should be discarded and the BB84 exchange repeated."
                : "The measured error rate is within the accepted threshold. Alice and Bob may continue with key generation."
              : "The protocol visualisation will update using live results from the FastAPI backend."}
          </p>
        </div>
      </div>
    </motion.section>
  );
}

export default ProtocolFlow;