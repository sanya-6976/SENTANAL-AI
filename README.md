# 🧠 Sentinel AI Module

> AI Engine for Sentinel AI – AI-Powered Crime Intelligence & Investigation Platform

Developed by: **Lina Aggarwal**

# Overview
The AI Module is the intelligence engine of Sentinel AI. It assists law enforcement officers by understanding natural language queries, retrieving relevant crime records, predicting crime hotspots, generating investigation reports, and providing AI-driven investigation insights.


# AI Architecture

Officer Query
      │
      ▼
AI Orchestrator
      │
      ▼
AI Router
      │
      ├── Investigation Agent
      ├── Prediction Agent
      ├── Report Agent
      ├── Similarity Analyzer
      ├── Digital Intelligence Analyzer
      └── Investigation Diary
      │
      ▼
RAG Engine
      │
      ▼
Gemini AI
      │
      ▼
Professional Response


# Features

## OCR Pipeline
- Extract text from FIR images
- Extract text from PDF documents
- Unified document loader

## AI FIR Extraction
- FIR Number Extraction
- Crime Type Detection
- Suspect Detection
- Vehicle Detection
- Location Detection
- AI Summary Generation
- Confidence Score

## Retrieval-Augmented Generation (RAG)
- Document Loader
- Text Chunking
- Embedding Generation
- Custom Vector Store
- Similarity Retrieval
- Context Builder
- Prompt Builder

## Investigation Agent
Supports:
- FIR Search
- Crime Analysis
- Investigation Assistance
- Question Answering

## Prediction Agent
Supports:
- Crime Hotspot Prediction
- Risk Assessment
- Explainable AI
- Crime Trend Analysis
- 
## Report Agent
Generates:
- Investigation Reports
- Case Summaries
- Professional AI Reports

## Multilingual AI
Supports:
- Automatic Language Detection
- Translation to English
- Multilingual FIR Processing

---

## Voice Search

Supports:

- Voice Query Processing
- AI Investigation through Speech

---

## Crime Pattern Similarity

Supports:

- Similar Case Detection
- Similarity Score
- AI Confidence Meter
- Pattern Matching

---

## Digital Intelligence Analyzer

Analyzes:

- Suspect Profile
- Device Information
- Phone Number
- IP Address
- Known Associates
- Previous Cases
- AI Investigation Summary

---

## Officer Investigation Diary

Provides:

- Investigation Timeline
- Progress Summary
- Missing Investigation Steps
- AI Recommendations

---

## Machine Learning

Implemented Models:

- Crime Hotspot Prediction
- Risk Score
- Explainability Service
- Modus Operandi Anomaly Detection


# Project Structure

app/
│
├── agents/
│   ├── ai_router.py
│   ├── ai_orchestrator.py
│   ├── investigation_agent.py
│   ├── prediction_agent.py
│   └── report_agent.py
│
├── ml/
│
├── prompts/
│
├── rag/
│
├── services/
│
└── tests/



# AI Workflow

Officer Query
↓
Language Detection
↓
Translation (if required)
↓
AI Router
↓
Selected AI Agent
↓
RAG / ML
↓
Gemini
↓
Professional Investigation Response


# Technologies
- Python
- Google Gemini API
- Tesseract OCR
- Retrieval-Augmented Generation (RAG)
- Custom Vector Store
- NumPy
- Pandas


# AI Testing
Implemented Tests
- OCR
- Extraction
- Embedding
- Retrieval
- Context Builder
- Prompt Builder
- Investigation Agent
- Prediction Agent
- Report Agent
- AI Pipeline
- Voice Search
- Multilingual AI
- Similarity Analyzer
- Digital Intelligence Analyzer
- Investigation Diary


# Future Scope
- Interactive Neo4j Criminal Network
- Live GIS Crime Mapping
- CCTV Integration
- Real-time Crime Alerts
- Predictive Crime Forecasting
- Mobile Investigation Assistant


# Status
✅ OCR Pipeline
✅ AI Extraction
✅ RAG Engine
✅ Investigation Agent
✅ Prediction Agent
✅ Report Agent
✅ AI Router
✅ AI Orchestrator
✅ Crime Hotspot Prediction
✅ Explainable AI
✅ Anomaly Detection
✅ Multilingual AI
✅ Voice Search
✅ Crime Pattern Similarity
✅ AI Confidence Meter
✅ Digital Intelligence Analyzer
✅ Officer Investigation Diary

Sentinel AI – AI-Powered Crime Intelligence Platform
