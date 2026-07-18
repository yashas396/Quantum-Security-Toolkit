from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.bb84 import run_bb84
from core.security import calculate_qber, channel_status

app = FastAPI(title="Quantum Security Toolkit API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Quantum Security Toolkit API Running"}


@app.get("/simulate")
def simulate():
    result = run_bb84(32, eve=True)

    errors, qber = calculate_qber(result.alice_key, result.bob_key)

    return {
        "qber": round(qber, 2),
        "errors": errors,
        "key_length": result.key_length,
        "match_rate": round(result.basis_match_rate, 2),
        "keys_match": result.keys_match,
        "status": channel_status(qber),
        "alice_key": "".join(map(str, result.alice_key)),
        "bob_key": "".join(map(str, result.bob_key)),
    }