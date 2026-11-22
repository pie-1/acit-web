import React from 'react';
import ReactDOM from 'react-dom/client';
import { ParticlesProvider } from '@tsparticles/react';
import { ThemeProvider } from '@/context/ThemeContext';
import { AppRoutes } from '@/routes/AppRoutes';
import './index.css';

const initEngine = async (engine) => {
  const { loadSlim } = await import('@tsparticles/slim');
  await loadSlim(engine);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <ParticlesProvider init={initEngine}>
        <AppRoutes />
      </ParticlesProvider>
    </ThemeProvider>
  </React.StrictMode>
);