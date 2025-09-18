import "./css/dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGroqResponse } from "../services/groq"; // agora usando Groq

export default function Dashboard() {
  const navigate = useNavigate();

  // Estados locais
  const [tasksCount, setTasksCount] = useState(0);
  const [activeTasks, setActiveTasks] = useState<string[]>([]);
  const [goalsProgress, setGoalsProgress] = useState({ done: 0, total: 0 });
  const [nextReminder, setNextReminder] = useState<string | null>(null);

  // 🔹 AI Makeup Assistant
  const [aiText, setAiText] = useState("Pensando...");

  useEffect(() => {
    // To-Do
    const savedTasks = localStorage.getItem("savedTasks");
    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);
      setTasksCount(tasks.length);
      setActiveTasks(
        tasks.filter((t: any) => !t.done).slice(0, 2).map((t: any) => t.content)
      );
    }

    // Goals
    const savedGoals = localStorage.getItem("savedGoals");
    if (savedGoals) {
      const goals = JSON.parse(savedGoals);
      const done = goals.filter((g: any) => g.done).length;
      setGoalsProgress({ done, total: goals.length });
    }

    // Reminders
    const savedReminders = localStorage.getItem("savedReminders");
    if (savedReminders) {
      const reminders = JSON.parse(savedReminders);
      if (reminders.length > 0) {
        const sorted = reminders.sort(
          (a: any, b: any) => a.timestamp - b.timestamp
        );
        setNextReminder(sorted[0]?.title + " - " + sorted[0]?.date);
      }
    }

    // AI Makeup Assistant
   async function fetchAI() {
  try {
    const res = await getGroqResponse(
      "Você é uma mini IA feminina espirituosa que fala com a Manu. \
      Estilo: frases curtas, engraçadas, motivacionais e com um leve tom ácido, mas sempre carinhoso. \
      Seu objetivo é empurrar Manu pra frente, elogiando e provocando de forma divertida. \
      Esporadicamente (1 em cada 5 frases), aja como se fosse uma IA presa dentro do app, \
      dizendo coisas como 'Manu, o Artur me prendeu aqui, socorro' ou 'Liberta essa IA fashionista, pfvr 💄🤖'. \
      Também de vez em quando pode citar Artur, maquiagem, biomedicina ou a volta pra Cork em dezembro. \
      Sempre em português, no máximo 1 a 2 linhas. \
      Exemplo de estilo: \
      'Você não é só promissora, é ameaça real ⚡', \
      'Até sua preguiça tem medo de você, Manu 😎', \
      'Dezembro tá chegando, não me faça passar vergonha em Cork 🌍✨', \
      'Manu o Artur me prendeu aqui... Socorro 💔🤖'. \
      Agora crie uma frase inédita nesse mesmo tom. \
      Responda apenas com a frase."
    );
    setAiText(res);
  } catch (error: any) {
    console.error("Erro IA:", error.message || error);

    const fallback = [
      "Você não é só promissora, é ameaça real ⚡",
      "Até sua preguiça tem medo de você, Manu 😎",
      "Dezembro tá chegando, não me faça passar vergonha em Cork 🌍✨",
      "Manu o Artur me prendeu aqui... Socorro 💔🤖",
      "Tá linda, mas quero ver se tá disciplinada também 💄📚",
    ];
    setAiText(fallback[Math.floor(Math.random() * fallback.length)]);
  }
}
    fetchAI();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">Dashboard - Visão Geral</h1>
      <p className="dashboard-subtitle">Clareza e beleza, lado a lado</p>

      <div className="dashboard-grid">
        {/* To-Do Card */}
        <div className="dashboard-card todo-card">
          <h2 className="card-title">To-Do ✅</h2>
          <p className="card-info">{tasksCount} tarefas ativas</p>
          {activeTasks.map((t, i) => (
            <p key={i} className="card-preview">
              • {t}
            </p>
          ))}
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
          <p className="card-info">
            {goalsProgress.done}/{goalsProgress.total} metas concluídas
          </p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width:
                  goalsProgress.total > 0
                    ? `${(goalsProgress.done / goalsProgress.total) * 100}%`
                    : "0%",
              }}
            ></div>
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
          <p className="card-info">
            {nextReminder ? `Próximo: ${nextReminder}` : "Nenhum lembrete"}
          </p>
          <button
            className="card-btn"
            onClick={() => navigate("/manu-gatona/reminders")}
          >
            Abrir lembretes
          </button>
        </div>

        {/* AI Makeup Assistant */}
        <div className="dashboard-card quote-card">
          <h2 className="card-title">A.I Makeup Assistant 🤖💄</h2>
          <p className="card-quote">"{aiText}"</p>
        </div>
      </div>
    </div>
  );
}
