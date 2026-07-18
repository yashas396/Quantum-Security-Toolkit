from dataclasses import dataclass


@dataclass
class BB84Result:

    alice_bits: list[int]
    alice_bases: list[str]

    bob_bases: list[str]
    bob_results: list[int]

    matching_indices: list[int]

    alice_key: list[int]
    bob_key: list[int]

    eve_present: bool = False
    eve_bases: list[str] | None = None
    eve_results: list[int] | None = None

    error_count: int = 0
    qber: float = 0.0

    @property
    def total_qubits(self):
        return len(self.alice_bits)

    @property
    def key_length(self):
        return len(self.alice_key)

    @property
    def basis_match_rate(self):
        if self.total_qubits == 0:
            return 0

        return self.key_length / self.total_qubits * 100

    @property
    def keys_match(self):
        return self.alice_key == self.bob_key