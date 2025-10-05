import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BigCalendar from './pages/BigCalendar';
import MapPage from './pages/MapPage';
import Chat from './pages/Chat';
import Events from './pages/Events';
import Event from './pages/Event';
import './App.css';
import CreateEvent from './pages/CreateEvent';
import VolunteerPage from './pages/VolunteerPage';
import OrganizationPage from './pages/OrganizationPage';
import CoordinatorPage from './pages/CoordinatorPage';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calendar" element={<BigCalendar />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/event/:id" element={<Event />} />
        <Route path="/events" element={<Events />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/create-event/:start/:end" element={<CreateEvent />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
        <Route path="/organization" element={<OrganizationPage />} />
        <Route path="/coordinator" element={<CoordinatorPage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
