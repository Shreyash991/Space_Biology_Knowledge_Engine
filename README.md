# NASA Bioscience Explorer

A beautiful, interactive dashboard for exploring NASA's bioscience research papers that enable human space exploration to the Moon and Mars.

## Features

- Modern, space-themed UI with responsive design
- Interactive paper tiles with detailed summaries
- AI-powered chatbot for answering research questions
- Search and filter capabilities
- Data visualizations

## Getting Started

### Prerequisites

- Node.js 14.0 or later
- npm 6.0 or later

### Installation

1. Clone this repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

### Using the Gemini AI Chatbot

To enable the AI chatbot functionality:

1. Get an API key from Google AI Studio.
2. Create a file named `.env.local` at the project root with:

```
REACT_APP_GEMINI_API_KEY=YOUR_GEMINI_KEY_HERE
```

3. Restart the dev server so the environment variable is loaded.

Note: Never commit your real API key. The app reads the key from `process.env.REACT_APP_GEMINI_API_KEY`.

## Built With

- React
- Tailwind CSS
- Framer Motion
- Google Gemini AI
