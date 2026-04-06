import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalStyle } from './styles/theme';
import { Login } from './pages/Login';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Persons } from './pages/Persons';
import { Scanner } from './pages/Scanner';
import { History } from './pages/History';
import { InOut } from './pages/InOut';
import { Settings } from './pages/Settings/Settings';
import { PersonDetail } from './pages/PersonDetail';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="inout" element={<InOut />} />
          <Route path="persons" element={<Persons />} />
          <Route path="scanner/:mode?" element={<Scanner />} />
          <Route path="history" element={<History />} />
          <Route path="settings" element={<Settings />} />
          <Route path="persons/:id" element={<PersonDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;