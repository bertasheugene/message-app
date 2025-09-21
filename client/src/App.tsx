import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import MessagePage from "./pages/MessagePage";

const App: React.FC = () => {
  return (
    <div className="bg-gray-900 text-gray-300">
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/form" element={<MessagePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
