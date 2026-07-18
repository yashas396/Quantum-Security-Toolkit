const BASE_URL = "http://127.0.0.1:8000";

export async function runSimulation() {
  const response = await fetch(`${BASE_URL}/simulate`);

  if (!response.ok) {
    throw new Error("Failed to run simulation");
  }

  return await response.json();
}