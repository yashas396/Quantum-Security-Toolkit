from base64 import b64encode
from pathlib import Path

import streamlit as st


st.set_page_config(
    page_title="Quantum Security Toolkit",
    page_icon="⚛️",
    layout="wide",
    initial_sidebar_state="collapsed",
)


def get_video_base64(file_path: str) -> str:
    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(
            f"Background video not found: {file_path}"
        )

    return b64encode(
        path.read_bytes()
    ).decode("utf-8")


video_base64 = get_video_base64(
    "assets/background.mp4"
)


st.markdown(
    f"""
    <style>
        header[data-testid="stHeader"] {{
            background: transparent;
        }}

        [data-testid="stAppViewContainer"] {{
            background: transparent;
        }}

        [data-testid="stMain"] {{
            background: transparent;
        }}

        .stApp {{
            background: transparent;
        }}

        .block-container {{
            position: relative;
            z-index: 10;

            max-width: 1400px;
            padding-top: 3rem;
        }}

        #quantum-background {{
            position: fixed;
            inset: 0;

            width: 100vw;
            height: 100vh;

            object-fit: cover;

            z-index: -3;

            transform:
                translate(-50%, -50%)
                scale(1.10);

            top: 50%;
            left: 50%;

            filter:
                brightness(0.52)
                contrast(1.1)
                saturate(0.9);

            transition:
                transform 0.12s ease-out;
        }}

        .background-overlay {{
            position: fixed;
            inset: 0;

            z-index: -2;

            background:
                radial-gradient(
                    circle at 20% 20%,
                    rgba(34, 211, 238, 0.08),
                    transparent 32%
                ),
                radial-gradient(
                    circle at 80% 30%,
                    rgba(139, 92, 246, 0.10),
                    transparent 34%
                ),
                linear-gradient(
                    180deg,
                    rgba(2, 6, 23, 0.32),
                    rgba(2, 6, 23, 0.80)
                );

            pointer-events: none;
        }}

        .hero {{
            margin-top: 4rem;
            padding: 3rem;

            border:
                1px solid
                rgba(148, 163, 184, 0.18);

            border-radius: 28px;

            background:
                rgba(8, 15, 35, 0.48);

            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);

            box-shadow:
                0 30px 90px
                rgba(0, 0, 0, 0.42);
        }}

        .hero-badge {{
            display: inline-block;

            padding:
                0.45rem
                0.9rem;

            margin-bottom: 1.2rem;

            border:
                1px solid
                rgba(34, 211, 238, 0.30);

            border-radius: 999px;

            background:
                rgba(34, 211, 238, 0.08);

            color: #67e8f9;

            font-size: 0.78rem;
            font-weight: 700;
            letter-spacing: 0.12rem;
        }}

        .hero-title {{
            margin: 0;

            color: #f8fafc;

            font-size:
                clamp(
                    2.5rem,
                    6vw,
                    5.5rem
                );

            line-height: 1.02;

            letter-spacing: -0.06em;

            text-shadow:
                0 0 35px
                rgba(34, 211, 238, 0.18);
        }}

        .hero-title span {{
            background:
                linear-gradient(
                    90deg,
                    #67e8f9,
                    #a78bfa
                );

            -webkit-background-clip: text;
            background-clip: text;

            color: transparent;
        }}

        .hero-subtitle {{
            max-width: 750px;

            margin-top: 1.4rem;

            color: #cbd5e1;

            font-size: 1.08rem;
            line-height: 1.8;
        }}
    </style>

    <video
        id="quantum-background"
        autoplay
        muted
        loop
        playsinline
    >
        <source
            src="data:video/mp4;base64,{video_base64}"
            type="video/mp4"
        >
    </video>

    <div class="background-overlay"></div>

    <section class="hero">
        <div class="hero-badge">
            QUANTUM SECURITY OPERATIONS
        </div>

        <h1 class="hero-title">
            Quantum Security
            <span>Toolkit</span>
        </h1>

        <p class="hero-subtitle">
            Interactive BB84 quantum key distribution,
            eavesdropping simulation and real-time QBER
            security analysis.
        </p>
    </section>
    """,
    unsafe_allow_html=True,
)