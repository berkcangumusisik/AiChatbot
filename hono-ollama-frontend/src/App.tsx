import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatUI from './components/ChatUI/ChatUI';
import Home from './components/Home/Home';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatUI />} />
      </Routes>
    </Router>
  );
}

export default App;
