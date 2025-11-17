import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/custom/NavBar';
import LandingPage from './pages/LandingPage';
import HomeScreen from './pages/HomeScreen';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <Router>
      <main className="flex flex-col h-full w-full">
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<HomeScreen />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </Router>
  );
}
