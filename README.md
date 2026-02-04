# Problem-First Database (Application 4)

## Vision
A "Problem-First" database for entrepreneurs. Instead of starting with an idea, we start with a **validated problem**.
This platform aggregates "pain points" using a smart scraping engine and validates them through a voting system.

## Components
- **FrustrationMiner (Scraper):** Extracts problems from social media (Reddit, Twitter, etc.).
- **CrowdVoter (Validation):** Community voting on problems to assess market demand.
- **StartupNexus (Matching):** Connects valid problems with solution providers.

## Tech Stack
- **Backend:** Node.js (Express) or Go.
- **Frontend:** React Native.
- **Database:** PostgreSQL (PostGIS for geo-features if needed, though less critical here than App 3).

## Setup
1.  **Backend:** `cd backend && npm install`
2.  **Scraper:** `cd scraper && pip install -r requirements.txt`
3.  **Frontend:** `cd frontend && npx expo start`
