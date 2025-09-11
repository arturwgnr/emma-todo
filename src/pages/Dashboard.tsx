import "./css/dashboard.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">Dashboard - Visão Geral</h1>
      <p className="dashboard-subtitle">Clareza e beleza, lado a lado</p>

      <div className="dashboard-grid">
        {/* To-Do Card */}
        <div className="dashboard-card todo-card">
          <h2 className="card-title">To-Do ✅</h2>
          <p className="card-info">3 tarefas ativas</p>
          <p className="card-preview">• Comprar flores</p>
          <p className="card-preview">• Estudar Microrganismos</p>
          <button
            className="card-btn"
            onClick={() => navigate("/manu-gatona/toDoList")}
          >
            Ver tudo
          </button>
        </div>

        {/* Goals Card */}
        <div className="dashboard-card goals-card">
          <h2 className="card-title">Goals 🎯</h2>
          <p className="card-info">2/5 metas concluídas</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "40%" }}></div>
          </div>
          <button
            className="card-btn"
            onClick={() => navigate("/manu-gatona/goals")}
          >
            Ver metas
          </button>
        </div>

        {/* Reminders Card */}
        <div className="dashboard-card reminders-card">
          <h2 className="card-title">Reminders ⏰</h2>
          <p className="card-info">Próximo: Reunião amanhã 10h</p>
          <button
            className="card-btn"
            onClick={() => navigate("/manu-gatona/reminders")}
          >
            Abrir lembretes
          </button>
        </div>

        {/* Quote Card */}
        <div className="dashboard-card quote-card">
          <h2 className="card-title">Mood ✨</h2>
          <p className="card-quote">"Até as deusas precisam de café ☕"</p>
        </div>
      </div>
    </div>
  );
}
