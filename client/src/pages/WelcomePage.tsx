import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-700 p-4 rounded-lg shadow-xl max-w-lg w-full mx-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Добро пожаловать!</h1>
        <p className="text-lg mb-4">Для отправки сообщения нажмите "Далее".</p>

        <button
          type="button"
          onClick={() => navigate("/form")}
          className="btn btn-primary"
        >
          Далее
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
