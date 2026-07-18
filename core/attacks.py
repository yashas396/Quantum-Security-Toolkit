from random import Random

from core.bb84 import (
    generate_random_bases,
    measure_qubit,
)


def eve_intercept_resend(
    alice_bits,
    alice_bases,
    rng: Random,
):
    """
    Eve measures every qubit and resends it.
    """

    eve_bases = generate_random_bases(
        len(alice_bits),
        rng,
    )

    eve_results = []

    forwarded_bits = []
    forwarded_bases = []

    for bit, basis, eve_basis in zip(
        alice_bits,
        alice_bases,
        eve_bases,
    ):

        measured = measure_qubit(
            bit,
            basis,
            eve_basis,
            rng,
        )

        eve_results.append(measured)

        forwarded_bits.append(measured)
        forwarded_bases.append(eve_basis)

    return (
        forwarded_bits,
        forwarded_bases,
        eve_bases,
        eve_results,
    )