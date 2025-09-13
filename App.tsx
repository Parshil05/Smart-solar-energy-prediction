
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

type View = 'landing' | 'dashboard';

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');

  const navigateToDashboard = () => {
    setView('dashboard');
  };

  const navigateToHome = () => {
    setView('landing');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header onLogoClick={navigateToHome} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {view === 'landing' && <LandingPage onGetStarted={navigateToDashboard} />}
        {view === 'dashboard' && <Dashboard />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
