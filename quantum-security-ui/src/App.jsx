import Background from "./components/Background/Background";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <>
      <Background />

      <main className="app-content">
        <Dashboard />
      </main>
    </>
  );
}

export default App;