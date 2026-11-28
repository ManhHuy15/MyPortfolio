import React, { useState, useEffect } from 'react';
import {
  Contact,
  Expertise,
  FadeIn,
  Footer,
  Main,
  Navigation,
  Project,
  Timeline,
} from '@/components';
import { AiAssistant } from '@/features/ai-assistant';
import './index.scss';

function App() {
  const [mode, setMode] = useState<string>(() => {
    return localStorage.getItem('theme-mode') || 'light';
  });

  const handleModeChange = () => {
    setMode((prevMode) => {
      const nextMode = prevMode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme-mode', nextMode);
      return nextMode;
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
      <Navigation parentToChild={{ mode }} modeChange={handleModeChange} />
      <FadeIn transitionDuration={700}>
        <Main />
        <Expertise />
        <Timeline />
        <Project />
        <Contact />
      </FadeIn>
      <Footer />
      <AiAssistant />
    </div>
  );
}

export default App;
