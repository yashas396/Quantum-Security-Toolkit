function KeysSection({ simulation }) {
  return (
    <div className="keys-panel">
      <div className="key-box">
        <div className="key-header">
          <h3>Alice Key</h3>

          <span>{simulation.alice_key.length} bits</span>
        </div>

        <p>
          {simulation.alice_key ||
            "Run the simulation to generate Alice's key."}
        </p>
      </div>

      <div className="key-box">
        <div className="key-header">
          <h3>Bob Key</h3>

          <span>{simulation.bob_key.length} bits</span>
        </div>

        <p>
          {simulation.bob_key ||
            "Run the simulation to generate Bob's key."}
        </p>
      </div>
    </div>
  );
}

export default KeysSection;