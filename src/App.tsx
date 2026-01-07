import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './views/Home';
import Alert from './views/Alert';
import Meteo from './views/Meteo';
import Boky from './views/Boky';
import Torohevitra from './views/Torohevitra';
import { JournalProvider } from './context/JournalContext'; 
import { AppProvider, useApp } from './context/AppContext';
import SplashScreen from './views/SplashScreen';

const AppContent = () => {
  const { loading } = useApp();

  if (loading) return <SplashScreen />;

  return (
    <div className="animate-in fade-in duration-700">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="fandraisana" replace />} />
          <Route path="fandraisana" element={<Home />} />
          <Route path="toetr_andro" element={<Meteo />} />
          <Route path="fanairana" element={<Alert />} />
          <Route path="boky" element={<Boky />} />
          <Route path="torohevitra" element={<Torohevitra />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppProvider>
        <JournalProvider>
          <AppContent />
        </JournalProvider>
      </AppProvider>
    </Router>
  );
}

export default App;