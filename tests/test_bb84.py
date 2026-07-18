import pytest

from core.bb84 import bits_to_string, run_bb84


def test_keys_match():
    result = run_bb84(
        qubits=100,
        seed=10,
    )

    assert result.keys_match is True


def test_requested_qubit_count():
    result = run_bb84(
        qubits=50,
        seed=20,
    )

    assert result.total_qubits == 50
    assert len(result.alice_bases) == 50
    assert len(result.bob_bases) == 50
    assert len(result.bob_results) == 50


def test_key_length():
    result = run_bb84(
        qubits=100,
        seed=30,
    )

    assert result.key_length <= 100


def test_invalid_qubit_count():
    with pytest.raises(ValueError):
        run_bb84(qubits=0)


def test_bits_to_string():
    assert bits_to_string([1, 0, 1, 1]) == "1011"