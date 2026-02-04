# Frustra : Le Catalogue de Problèmes

## Vision
**Transformer la plainte en actif.**
Frustra identifie les "Founding Problems" sur les réseaux sociaux et permet aux entrepreneurs de valider leur marché avant d'écrire une ligne de code.

## Piliers Techniques
- **SentimentAnalyzer (Python):** Extraction de problèmes via LLM (Mock/LangChain).
- **ValidationEngine (Node.js):** Système de vote "Moi aussi" avec vérification d'identité.
- **MarketReportGen (Go):** Génération de rapports premium pour les investisseurs (Seuil > 1000 votes).


## Tech Stack
- **Backend:** Node.js (Express) or Go.
- **Frontend:** React Native.
- **Database:** PostgreSQL (PostGIS for geo-features if needed, though less critical here than App 3).

## Setup
1.  **Backend:** `cd backend && npm install`
2.  **Scraper:** `cd scraper && pip install -r requirements.txt`
3.  **Frontend:** `cd frontend && npx expo start`
