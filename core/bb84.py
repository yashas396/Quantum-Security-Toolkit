from random import Random

from core.models import BB84Result
from core.security import calculate_qber, channel_status


VALID_BASES = ["Z", "X"]


def generate_random_bits(count, rng):
    """Generate random bits containing only 0 and 1."""

    if count <= 0:
        raise ValueError("Count must be greater than zero.")

    return [
        rng.randint(0, 1)
        for _ in range(count)
    ]


def generate_random_bases(count, rng):
    """Generate random BB84 bases: Z or X."""

    if count <= 0:
        raise ValueError("Count must be greater than zero.")

    return [
        rng.choice(VALID_BASES)
        for _ in range(count)
    ]


def measure_qubit(
    bit,
    preparation_basis,
    measurement_basis,
    rng,
):
    """
    Simulate measurement of one BB84 qubit.

    If the preparation and measurement bases match,
    the original bit is recovered.

    If the bases do not match,
    the result is random.
    """

    if bit not in [0, 1]:
        raise ValueError("Bit must be either 0 or 1.")

    if preparation_basis not in VALID_BASES:
        raise ValueError(
            "Preparation basis must be Z or X."
        )

    if measurement_basis not in VALID_BASES:
        raise ValueError(
            "Measurement basis must be Z or X."
        )

    if preparation_basis == measurement_basis:
        return bit

    return rng.randint(0, 1)


def run_bb84(
    qubits=16,
    seed=None,
    eve=False,
):
    """
    Run the BB84 Quantum Key Distribution protocol.

    Parameters:
        qubits:
            Number of qubits transmitted.

        seed:
            Optional random seed for reproducible output.

        eve:
            If True, Eve performs an intercept-resend attack.
    """

    if qubits <= 0:
        raise ValueError(
            "Number of qubits must be greater than zero."
        )

    rng = Random(seed)

    # Alice prepares random bits and bases.
    alice_bits = generate_random_bits(
        qubits,
        rng,
    )

    alice_bases = generate_random_bases(
        qubits,
        rng,
    )

    # By default, the original qubits travel directly to Bob.
    channel_bits = alice_bits.copy()
    channel_bases = alice_bases.copy()

    eve_present = False
    eve_bases = None
    eve_results = None

    # Eve intercepts, measures and resends the qubits.
    if eve:
        from core.attacks import eve_intercept_resend

        (
            channel_bits,
            channel_bases,
            eve_bases,
            eve_results,
        ) = eve_intercept_resend(
            alice_bits,
            alice_bases,
            rng,
        )

        eve_present = True

    # Bob independently selects random bases.
    bob_bases = generate_random_bases(
        qubits,
        rng,
    )

    bob_results = []

    # Bob measures each received qubit.
    for index in range(qubits):
        measured_bit = measure_qubit(
            bit=channel_bits[index],
            preparation_basis=channel_bases[index],
            measurement_basis=bob_bases[index],
            rng=rng,
        )

        bob_results.append(measured_bit)

    # Alice and Bob compare only their bases.
    matching_indices = []

    for index in range(qubits):
        if alice_bases[index] == bob_bases[index]:
            matching_indices.append(index)

    # Keep bits only where Alice's and Bob's bases matched.
    alice_key = []
    bob_key = []

    for index in matching_indices:
        alice_key.append(
            alice_bits[index]
        )

        bob_key.append(
            bob_results[index]
        )

    # Calculate security errors and QBER.
    error_count, qber = calculate_qber(
        alice_key,
        bob_key,
    )

    return BB84Result(
        alice_bits=alice_bits,
        alice_bases=alice_bases,
        bob_bases=bob_bases,
        bob_results=bob_results,
        matching_indices=matching_indices,
        alice_key=alice_key,
        bob_key=bob_key,
        eve_present=eve_present,
        eve_bases=eve_bases,
        eve_results=eve_results,
        error_count=error_count,
        qber=qber,
    )


def bits_to_string(bits):
    """Convert a list of bits into one binary string."""

    if bits is None:
        return "-"

    return "".join(
        str(bit)
        for bit in bits
    )


def bases_to_string(bases):
    """Convert a list of bases into a readable string."""

    if bases is None:
        return "-"

    return " ".join(bases)


if __name__ == "__main__":
    result = run_bb84(
        qubits=32,
        seed=42,
        eve=True,
    )

    print()
    print("========== BB84 QUANTUM KEY DISTRIBUTION ==========")
    print()

    print(
        "Alice Bits     :",
        bits_to_string(result.alice_bits),
    )

    print(
        "Alice Bases    :",
        bases_to_string(result.alice_bases),
    )

    if result.eve_present:
        print(
            "Eve Bases      :",
            bases_to_string(result.eve_bases),
        )

        print(
            "Eve Results    :",
            bits_to_string(result.eve_results),
        )

    print(
        "Bob Bases      :",
        bases_to_string(result.bob_bases),
    )

    print(
        "Bob Results    :",
        bits_to_string(result.bob_results),
    )

    print()
    print(
        "Matching Index :",
        result.matching_indices,
    )

    print(
        "Alice Key      :",
        bits_to_string(result.alice_key),
    )

    print(
        "Bob Key        :",
        bits_to_string(result.bob_key),
    )

    print()
    print(
        "Total Qubits   :",
        result.total_qubits,
    )

    print(
        "Key Length     :",
        result.key_length,
    )

    print(
        "Basis Match    :",
        f"{result.basis_match_rate:.2f}%",
    )

    print(
        "Eve Present    :",
        result.eve_present,
    )

    print(
        "Keys Match     :",
        result.keys_match,
    )

    print()
    print(
        "Error Count    :",
        result.error_count,
    )

    print(
        "QBER           :",
        f"{result.qber:.2f}%",
    )

    print(
        "Channel Status :",
        channel_status(result.qber),
    )