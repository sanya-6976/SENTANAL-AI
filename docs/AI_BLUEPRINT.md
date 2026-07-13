# Sentinel AI – AI Engineering Blueprint

> Version: 1.0
>
> Module Owner: Lina Aggarwal (AI Developer)
>
> Project Duration: 15 Days

---

# Vision

Sentinel AI is an enterprise-grade AI-powered Crime Investigation Platform designed to assist law enforcement officers in analyzing cases, retrieving relevant information, predicting crime trends, discovering hidden relationships, and generating investigation reports.

The AI module acts as the intelligence engine of the entire platform.

---

# AI Philosophy

Gemini is **not** the brain.

Gemini is one component of the AI Engine.

The AI Engine is responsible for:

- Understanding user requests
- Planning tasks
- Selecting appropriate AI agents
- Gathering required information
- Producing intelligent responses

---

# AI Module Responsibilities

The AI module will:

- Understand natural language queries
- Search crime-related documents using RAG
- Predict crime hotspots using ML
- Analyze criminal networks
- Generate investigation reports
- Explain predictions using Explainable AI

---

# AI Request Flow

Officer Request

↓

AI Router

↓

AI Orchestrator

↓

├── Investigation Agent

├── Prediction Agent

├── Graph Agent

├── Report Agent

└── RAG Engine

↓

Gemini

↓

Professional Response

---

# AI Components

## AI Router

Receives every request and identifies the user's intent.

---

## AI Orchestrator

Coordinates all AI agents and combines their outputs.

---

## Investigation Agent

Responsible for:

- FIR search
- Case analysis
- Crime summaries
- Legal information

---

## Prediction Agent

Responsible for:

- Crime hotspot prediction
- Crime forecasting
- Risk assessment

---

## Graph Agent

Responsible for:

- Neo4j queries
- Criminal relationship analysis
- Network discovery

---

## Report Agent

Responsible for:

- Investigation reports
- PDF generation
- Case summaries

---

## RAG Engine

Responsible for:

- Loading documents
- Splitting text
- Creating embeddings
- Searching FAISS
- Providing context to Gemini

---

# Machine Learning Pipeline

Dataset

↓

Cleaning

↓

Feature Engineering

↓

Training

↓

Prediction

↓

Explainability

↓

Gemini Explanation

---

# RAG Pipeline

PDFs

↓

Loader

↓

Chunking

↓

Embeddings

↓

FAISS

↓

Retriever

↓

Gemini

---

# Folder Structure

```
ai/

├── core/

├── services/

├── agents/

├── rag/

├── ml/

├── prompts/

├── utils/

└── tests/
```

---

# Sprint Plan

## Sprint 1

- Project Foundation
- Gemini Integration
- Configuration
- Logging

---

## Sprint 2

- RAG
- Embeddings
- FAISS
- Retrieval

---

## Sprint 3

- Machine Learning
- Crime Forecasting
- Hotspot Prediction

---

## Sprint 4

- AI Agents
- AI Router
- AI Orchestrator

---

## Sprint 5

- Integration
- Testing
- Documentation
- Deployment

---

# Engineering Principles

- Every file has one responsibility.
- Every commit represents a working feature.
- No secrets in GitHub.
- No duplicated code.
- Simplicity over unnecessary complexity.
- Every architectural decision must have a reason.

---

# Future Scope

- Voice Investigation Assistant
- Real-time Crime Alerts
- CCTV Integration
- Live GIS Mapping
- Multi-language Support
- AI Investigation Timeline
- Explainable AI Dashboard

# Sprint A1 - OCR Pipeline ✅

## Goal
Enable Sentinel AI to extract text from images and PDFs.

## Features Completed
- ✅ OCR Engine (Tesseract)
- ✅ Image Text Extraction
- ✅ Digital PDF Text Extraction
- ✅ Basic Scanned PDF Handling
- ✅ Unified Document Loading

## Technologies Used
- Tesseract OCR
- pytesseract
- Pillow
- PyMuPDF

## Outcome
Sentinel AI can successfully extract text from images and PDF documents, creating the foundation for AI-based information extraction.