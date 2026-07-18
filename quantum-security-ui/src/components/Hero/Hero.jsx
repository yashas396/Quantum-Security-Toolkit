import {
  FaAtom,
  FaCircleNotch,
  FaPlay,
  FaShieldAlt,
} from "react-icons/fa";

import GlassCard from "../UI/GlassCard";
import "./Hero.css";

function Hero({ onRunSimulation, loading }) {
  return (
    <section className="hero-section">
      <GlassCard className="hero-card">
        <div className="hero-content">
          <div className="hero-badge">
            <FaShieldAlt aria-hidden="true" />
            <span>Project Q · Quantum Security</span>
          </div>

          <h1>Quantum Security Toolkit</h1>

          <p className="hero-description">
            Simulate the BB84 quantum key distribution protocol, measure QBER,
            compare Alice and Bob&apos;s generated keys, and analyze whether the
            quantum communication channel is secure or compromised.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className={`hero-btn ${loading ? "hero-btn-loading" : ""}`}
              onClick={onRunSimulation}
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <FaCircleNotch
                    className="hero-btn-icon hero-spinner"
                    aria-hidden="true"
                  />
                  <span>Running BB84 Simulation...</span>
                </>
              ) : (
                <>
                  <FaPlay
                    className="hero-btn-icon"
                    aria-hidden="true"
                  />
                  <span>Run Simulation</span>
                </>
              )}
            </button>

            <div
              className={`hero-status ${
                loading ? "hero-status-running" : ""
              }`}
              aria-live="polite"
            >
              <span className="hero-status-dot" />

              <span>
                {loading
                  ? "Quantum circuit processing"
                  : "Simulation engine ready"}
              </span>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="quantum-orbit orbit-one">
            <span />
          </div>

          <div className="quantum-orbit orbit-two">
            <span />
          </div>

          <div className="quantum-orbit orbit-three">
            <span />
          </div>

          <div className="quantum-core">
            <FaAtom />
          </div>
        </div>
      </GlassCard>
    </section>
  );
}

export default Hero;