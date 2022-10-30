import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Dash from './Dashboard/Dash';
import PlayGame from './PlayGame/PlayGame';
import Hole from './Hole/Hole';
import EndGame from './Hole/EndGame/EndGame';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="Dash" element={<Dash />} />
            <Route path="PlayGame" element={<PlayGame />} />
            <Route path="Hole" element={<Hole/>} />
            <Route path="EndGame" element={<EndGame/>} />
        </Routes>
    </Router>
);
