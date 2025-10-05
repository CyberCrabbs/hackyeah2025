import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BigCalendar from './pages/BigCalendar';
import MapPage from './pages/MapPage';
import Chat from './pages/Chat';
import EventPage from './pages/EventPage';
import './App.css';
import CreateEvent from './pages/CreateEvent';
import VolunteerPage from './pages/VolunteerPage';
import CoordinatorPage from './pages/CoordinatorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calendar" element={<BigCalendar />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/create-event/:start/:end" element={<CreateEvent />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
        <Route path="/coordinator" element={<CoordinatorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
