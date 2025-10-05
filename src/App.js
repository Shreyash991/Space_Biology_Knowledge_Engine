import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PaperDetail from './pages/PaperDetail';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 to-indigo-950 text-white">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/paper/:id" element={<PaperDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
