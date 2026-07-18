import { FaGithub, FaShieldAlt } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo" aria-hidden="true">
            <FaShieldAlt />
          </div>

          <div>
            <strong>Quantum Security Toolkit</strong>
            <p>
              BB84 simulation and quantum communication security analysis.
            </p>
          </div>
        </div>

        <div className="footer-links">
          <a
            href="https://github.com/YOUR_USERNAME/YOUR_REPOSITORY"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View project source code on GitHub"
          >
            <FaGithub aria-hidden="true" />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {currentYear} Quantum Security Toolkit</span>
        <span>Built with React, FastAPI and Qiskit</span>
      </div>
    </footer>
  );
}

export default Footer;