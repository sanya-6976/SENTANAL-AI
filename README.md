<div align="center">
  <img src="https://img.shields.io/badge/Sentinel%20AI-0F172A?style=for-the-badge&logo=policereact&logoColor=2563EB" alt="Sentinel AI Logo" />
  <h1>Sentinel AI</h1>
  <p><b>Next-Generation AI-Powered Crime Intelligence & Investigation Operating System</b></p>

  [![React](https://img.shields.io/badge/React-19.2-20232A?style=flat-square&logo=react)](https://react.dev)
  [![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?style=flat-square&logo=postgresql)](https://neon.tech)
  [![Neo4j](https://img.shields.io/badge/Neo4j-Graph_DB-4581C3?style=flat-square&logo=neo4j)](https://neo4j.com)
  [![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=flat-square&logo=google)](https://deepmind.google/technologies/gemini/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
</div>

<br />

**Sentinel AI** is an enterprise-grade, comprehensive Crime Intelligence platform designed for modern law enforcement and intelligence agencies. It seamlessly bridges raw operational data, geospatial analytics, graph-based criminal networks, and state-of-the-art Generative AI to accelerate case resolution and provide unprecedented tactical insights.

---

## 🌟 Core Modules & Features

### 🧠 1. Artificial Intelligence & NLP (AI Domain)
- **Multilingual AI Translation**: Automatically translates vernacular FIRs (Kannada, Hindi, Marathi, etc.) into English while extracting precise legal entities (IPC/BNS sections, Suspects, Evidence).
- **AI Crime Pattern Similarity**: Analyzes modus operandi (MO), suspect descriptions, and crime types using NLP to identify linked cases and serial offenders across jurisdictions.
- **Interactive Case Assistant**: A chat-based intelligence assistant securely sandboxed to your active case files, capable of answering queries, summarizing case files, and cross-referencing evidence.
- **Automated Dossier Generation**: Compiles raw database entries into professionally structured, downloadable PDF intelligence briefs using `jsPDF`.
- **Voice Search & OCR**: Voice-to-text querying and Tesseract/EasyOCR fallback integrations for digitizing physical case files and evidence.

### 🕸️ 2. Data Intelligence & GIS (Data Domain)
- **Criminal Network Graphs**: Powered by **Neo4j**, it visualizes complex relationships between suspects, vehicles, communication logs, and syndicates.
- **GIS Intelligence & Heatmaps**: Uses **GeoPandas** and **Shapely** to plot crime hotspots, enabling predictive policing and strategic resource allocation.
- **Digital Intelligence Hub**: Analyzes forensic digital artifacts, CDRs (Call Detail Records), and IP logs for anomalous activities.

### 🖥️ 3. Frontend Operations (Frontend Domain)
- **Immersive User Interface**: A highly responsive, dark-mode-first dashboard built with **React 19** and **TailwindCSS v4**, engineered for low-light control rooms.
- **Investigation Workspace**: A central hub to track FIR details, evidence chain-of-custody, victim/accused profiles, and case timelines.
- **Officer Investigation Diary**: A secured, audited logging system for investigating officers to record daily updates and dispatch encrypted dockets.
- **Interactive Data Visualizations**: Real-time analytical charts and statistics powered by **Recharts**.

### ⚙️ 4. Backend Architecture (Backend Domain)
- **High-Performance API**: Driven by **FastAPI** and **Uvicorn**, providing asynchronous, non-blocking HTTP endpoints.
- **Relational Operations**: Managed via **SQLAlchemy** and **Alembic** migrations, connected to a highly available **PostgreSQL (Neon)** database.
- **Enterprise Security**: JWT-based authentication (`PyJWT`), Argon2 password hashing (`pwdlib`), and strict CORS/Environment isolation.
- **Resilient AI Pipelines**: Thread-pool execution for external AI API calls (Google Gemini) with seamless mock fallbacks for high availability.

---

## 🛠️ Technology Stack

| Domain | Technologies Used |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, TailwindCSS v4, React Router, Recharts, jsPDF, Lucide React, React Markdown |
| **Backend** | Python 3.12+, FastAPI, Uvicorn, SQLAlchemy, Alembic, PyJWT, Pydantic |
| **Databases** | PostgreSQL (Neon Serverless), Neo4j (Graph Database) |
| **Data & AI** | Google Gemini (GenAI), GeoPandas, Shapely, PyTesseract, EasyOCR, Spacy, RapidFuzz, Pandas, NumPy |

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- Python 3.12+
- `uv` (Python package manager)
- Neo4j Desktop (or AuraDB)

### 1. Environment Setup
Clone the repository and set up your environment variables by copying the template:
```bash
cp .env.example .env
```
*Populate the `.env` file with your PostgreSQL credentials, Neo4j URI, and Google Gemini API keys.*

### 2. Backend Initialization
Install the Python dependencies and boot up the FastAPI server:
```bash
# Install dependencies using uv
uv sync

# Run the Uvicorn server (with hot-reload)
uv run uvicorn backend.main:app --port 8000 --reload
```

### 3. Frontend Initialization
In a separate terminal, install the Node modules and launch the Vite development server:
```bash
# Install NPM dependencies
npm install

# Start the frontend dev server
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

---

## 🛡️ Security & Compliance
- **Data Privacy**: All AI processing limits PII exposure. Features are strictly scoped to authenticated user jurisdictions via RBAC (Role-Based Access Control).
- **Secret Management**: API keys and database credentials are strictly isolated in `.env` files (ignored via Git) to prevent accidental exposure.
- **Audit Logging**: Officer actions (investigation updates, assignments, intelligence generation) are securely logged for accountability.

---

## 🤝 Contribution Workflow
1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Ensure strict typings and linting: `npm run lint` & `uv run ruff check`
3. Commit with descriptive messages and submit a Pull Request to the `main` branch.

<br/>
<div align="center">
  <sub>Built with precision for law enforcement and intelligence professionals.</sub>
</div>
