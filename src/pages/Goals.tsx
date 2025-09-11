import "./css/goals.css";
import { useState } from "react";

export default function Goals() {
  interface Goal {
    id: number;
    title: string;
    date: string;
    progress: number;
    done: boolean;
  }

  const [goal, setGoal] = useState("");
  const [goals, setGoals] = useState<Goal[]>([]);

  function handleAddGoal() {
    if (!goal) return;

    const newGoal: Goal = {
      id: Date.now(),
      title: goal,
      date: new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      progress: 0,
      done: false,
    };

    setGoals([...goals, newGoal]);
    setGoal("");
  }

  function handleProgress(id: number) {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const newProgress = Math.min(g.progress + 10, 100);
          return {
            ...g,
            progress: newProgress,
            done: newProgress === 100,
          };
        }
        return g;
      })
    );
  }

  function handleDelete(id: number) {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  }

  return (
    <div className="goals-wrapper">
      {/* Topo da página */}
      <div className="goals-header">
        <h1 className="goals-title">Metas do mês</h1>
        <p className="goals-subtitle">
          Transforme grandes sonhos em pequenos passos
        </p>

        <div className="goals-input-area">
          <input
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            type="text"
            placeholder="Adicionar nova meta"
            className="goals-input"
          />
          <button onClick={handleAddGoal} className="goals-add-btn">
            Adicionar
          </button>
        </div>
      </div>

      {/* Lista de metas em cards */}
      <div className="goals-cards">
        {goals
          .sort((a, b) => Number(a.done) - Number(b.done))
          .map((g) => (
            <div
              key={g.id}
              className={`goal-card ${g.done ? "done" : ""}`}
            >
              <button
                className="goal-delete-btn"
                onClick={() => handleDelete(g.id)}
              >
                ✖
              </button>
              <h3 className="goal-card-title">{g.title}</h3>
              <p className="goal-card-date">{g.date}</p>
              <p className="goal-card-progress">Progresso: {g.progress}%</p>
              <button
                className="goal-progress-btn"
                onClick={() => handleProgress(g.id)}
                disabled={g.done}
              >
                {g.done ? "Concluído 🎉" : "Avançar +10%"}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
