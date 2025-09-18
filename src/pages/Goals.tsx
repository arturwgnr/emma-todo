import "./css/goals.css";
import { useState, useEffect } from "react";

export default function Goals() {
  interface Goal {
    id: number;
    title: string;
    date: string;
    progress: number;
    description: string;
    done: boolean;
  }

  // 🔹 Carregar do localStorage na primeira renderização
  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem("savedGoals");
    return saved ? JSON.parse(saved) : [];
  });

  const [goal, setGoal] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // 🔹 Sempre que goals mudar, salvar no localStorage
  useEffect(() => {
    localStorage.setItem("savedGoals", JSON.stringify(goals));
  }, [goals]);

  function handleAddGoal() {
    if (!goal.trim()) return;

    const newGoal: Goal = {
      id: Date.now(),
      title: goal,
      date: new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      progress: 0,
      description: "",
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

  function handleResetGoal(id: number) {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, progress: 0, done: false } : g
      )
    );
  }

  function handleDescription(id: number) {
    setEditingId(editingId === id ? null : id);
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
            onChange={(e) => {
              const formatted =
                e.target.value.charAt(0).toUpperCase() +
                e.target.value.slice(1);
              setGoal(formatted);
            }}
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
            <div key={g.id} className={`goal-card ${g.done ? "done" : ""}`}>
              <button
                className="goal-delete-btn"
                onClick={() => handleDelete(g.id)}
              >
                ✖
              </button>
              <h3 className="goal-card-title">{g.title}</h3>
              <p className="goal-card-date">{g.date}</p>
              <p className="goal-card-progress">Progresso: {g.progress}%</p>

              <div className="buttons-div">
                <button
                  className="goal-progress-btn"
                  onClick={() => handleProgress(g.id)}
                  disabled={g.done}
                >
                  {g.done ? "Concluído 🎉" : "Avançar +10%"}
                </button>

                <button
                  className="reset-btn"
                  onClick={() => handleResetGoal(g.id)}
                >
                  Reset
                </button>

                <button
                  onClick={() => handleDescription(g.id)}
                  className="goal-progress-btn-2"
                >
                  {editingId === g.id
                    ? "Salvar descrição"
                    : "Abrir descrição"}
                </button>
              </div>

              {/* Campo de descrição condicional */}
              {editingId === g.id && (
                <textarea
                  value={g.description}
                  onChange={(e) =>
                    setGoals((prev) =>
                      prev.map((goal) =>
                        goal.id === g.id
                          ? { ...goal, description: e.target.value }
                          : goal
                      )
                    )
                  }
                  placeholder="Escreva a descrição aqui..."
                  className="goal-description-input"
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
