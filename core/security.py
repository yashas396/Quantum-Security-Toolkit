def calculate_qber(
    alice_key,
    bob_key,
):
    """
    Calculate Quantum Bit Error Rate.
    """

    if len(alice_key) != len(bob_key):
        raise ValueError(
            "Keys must have equal length."
        )

    errors = 0

    for a, b in zip(
        alice_key,
        bob_key,
    ):

        if a != b:
            errors += 1

    if len(alice_key) == 0:
        return 0, 0

    qber = (
        errors / len(alice_key)
    ) * 100

    return errors, qber


def channel_status(qber):

    if qber < 5:
        return "SECURE"

    elif qber < 11:
        return "SUSPICIOUS"

    return "COMPROMISED"