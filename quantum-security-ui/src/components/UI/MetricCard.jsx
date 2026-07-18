import { motion } from "framer-motion";
import "./MetricCard.css";

function MetricCard({
  title,
  value,
  subtitle,
  color = "cyan",
}) {
  return (
    <motion.article
      className={`metric-card metric-${color}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.35 }}
    >
      <div className="metric-card-glow" />

      <div className="metric-card-content">
        <span className="metric-title">{title}</span>

        <strong className="metric-value">{value}</strong>

        <p className="metric-subtitle">{subtitle}</p>
      </div>
    </motion.article>
  );
}

export default MetricCard;