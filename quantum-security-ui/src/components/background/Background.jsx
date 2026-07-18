import { useEffect, useRef } from "react";
import "./Background.css";

function Background() {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 20;
      const y = (event.clientY / window.innerHeight - 0.5) * 20;

      if (backgroundRef.current) {
        backgroundRef.current.style.transform =
          `translate(${x}px, ${y}px) scale(1.05)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="background-wrapper">
      <div ref={backgroundRef} className="background-video-layer">
        <video autoPlay muted loop playsInline>
          <source src="/videos/galaxy.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="background-overlay" />
      <div className="glow glow-one" />
      <div className="glow glow-two" />
      <div className="cursor-light" />
    </div>
  );
}

export default Background;