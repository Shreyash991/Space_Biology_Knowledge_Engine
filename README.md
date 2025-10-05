# NASA Bioscience Explorer

An interactive, AI-assisted dashboard for exploring NASA bioscience publications. It summarizes papers, enables semantic search, and visualizes relationships via a 2D knowledge graph so users can quickly discover impacts, trends, and connections across hundreds of studies.

## ✨ Overview

- Beautiful, responsive UI built in React + Tailwind
- Paper tiles with rich summaries (title, authors, abstract, keywords, significance)
- AI chatbot (Gemini) that answers questions in the context of the opened paper
- Semantic search across all papers (title, abstract, keywords, category, citations)
- Interactive 2D Knowledge Graph with modes for Connections, Topic Clusters, and Citations
- CSV-backed dataset (608 papers) parsed and enriched client-side

## 🧠 How it works

1) Data ingestion
- `src/services/api.js` parses the provided CSV (title + link) and enriches each record with:
  - generated abstract, keywords, category, authors, publication date, citations, significance
  - related paper suggestions for graph connections
- All pages/components use these in-memory objects as the data source.

2) Semantic search
- A lightweight scoring function ranks papers by query relevance using:
  - title (highest weight), abstract, keywords, category, and citations
- UI: `SemanticSearchBar` + `SearchResults` shows ranked results and quick insights.

3) Knowledge Graph (2D Canvas)
- `src/components/KnowledgeGraph2D.js` renders papers as nodes and relationships as links
- Modes:
  - Research Connections: similarity/related links
  - Topic Clusters: category-based groupings with readable labels
  - Citation Network: node size/color influenced by citation counts
- Interactions: pan, zoom, hover tooltip with title, click to open paper detail

4) Paper detail
- `src/pages/PaperDetail.js` shows the selected paper’s summary, insights, and the graph
- The graph receives the full paper list so you can explore relationships from that context.

5) AI Chatbot (Gemini)
- `src/services/geminiService.js` builds a prompt with the current paper’s metadata
- Uses `REACT_APP_GEMINI_API_KEY` to call Gemini (model: `gemini-1.5-flash`),
  with a robust local fallback only if the API is unavailable.

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 16
- npm ≥ 8

### Install & run
```bash
npm install
npm start
```

The app starts at http://localhost:3000

### Environment variables (for AI chatbot)
Create `.env.local` in the project root:
```
REACT_APP_GEMINI_API_KEY=YOUR_GEMINI_KEY_HERE
```
Restart the dev server after adding or changing environment variables.

## 🧩 Project Structure (high-level)
```
src/
  components/
    KnowledgeGraph2D.js     # 2D canvas graph
    PaperSummary.js         # Paper details summary
    SemanticSearchBar.js    # AI search modal
    SearchResults.js        # Ranked results view
    Chatbot.js              # Paper-context chatbot panel
  pages/
    Home.js                 # Paper tiles + filters
    PaperDetail.js          # Summary, insights, knowledge graph, chatbot
  services/
    api.js                  # CSV parsing, enrichment, search API
    geminiService.js        # Gemini client + prompt construction
  styles/
    main.css
```

## 🛠 Tech Stack
- React (UI)
- Tailwind CSS (styling)
- Framer Motion (micro‑interactions)
- react-icons (icons)
- HTML5 Canvas (graph rendering)
- Google Gemini API (chatbot)

## ✅ Status
- 2D knowledge graph with topic clusters, connections, and citations
- Semantic search over the full CSV dataset
- Paper‑context chatbot integrated (requires API key)

## 🙌 Contributing
Issues and PRs are welcome. Please open an issue describing the change you’re proposing.

## 📄 License
This project is provided for the NASA bioscience exploration challenge context.
