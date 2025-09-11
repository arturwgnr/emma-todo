import { useState, useEffect } from "react";
import "./css/todo.css";

export default function Todo() {
  const [task, setTask] = useState<string>("");

  // 🔹 Carregar do localStorage na primeira renderização
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("savedTasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [emptyMessage, setEmptyMessage] = useState<string>("");

  // 🔹 Estados para edição
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  interface Task {
    id: number;
    content: string;
    done: boolean;
    date: string;
  }

  const emptyMessages = [
    "Nada pra fazer? Really? 🤨",
    "Tá suave demais por aqui... 😴",
    "Zero tarefas? Nem parece você 😏",
    "Que preguiçosa gostosa 👄",
    "A vida tá ganha já? 🏖️",
    "Sem nada? Bora inventar algo! 🤔",
    "Nem uma tarefa? ATA ✨",
    "Deus ta vendo... 👁️👄👁️",
    "Amor socorro, virei esse emoji: 🤴🏻",
    "Acho que voce vai virar esse emoji: 🐸",
    "QUE? 😳",
    "Pleaaaase, pleaaase, please... 🎤",
    "Quer que eu invente uma tarefa? 🤖",
     "Vagabundagem isso ai ein? 🤓"
    
  ];

  // 🔹 Sempre que tasks mudar, salva no localStorage
  useEffect(() => {
    localStorage.setItem("savedTasks", JSON.stringify(tasks));

    if (tasks.length === 0) {
      const random =
        emptyMessages[Math.floor(Math.random() * emptyMessages.length)];
      setEmptyMessage(random);
    }
  }, [tasks]);

  function handleAddTask() {
    if (!task) return;

    const today = new Date().toLocaleDateString("pt-BR"); // ex: 11/09/2025


    const newTask: Task = {
      id: Date.now(),
      content: task,
      done: false,
      date: today,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  }

  function handleDelete(id: number) {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
  }

  function handleToggle(id: number) {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    setTasks(updated);
  }

  // 🔹 Salvar edição
  function handleSave(id: number) {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, content: editText } : t
    );
    setTasks(updated);
    setEditingId(null);
    setEditText("");
  }

  return (
    <div className="todo-wrapper">
      <div className="todo-container">
        <h1 className="todo-title">Organize seu dia ✨</h1>
        <p className="todo-subtitle">Transforme tarefas em conquistas</p>

        <div className="todo-input-area">
          <input
            type="text"
            placeholder="Insira a tarefa..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={handleAddTask}>Adicionar</button>
        </div>

        <div className="todo-list">
          {tasks.length === 0 ? (
            <p className="todo-empty">{emptyMessage}</p>
          ) : (
            <ul>
              {tasks.map((t) => (
                <li
                  className={t.done ? "done" : ""}
                  key={t.id}
                  onClick={() => handleToggle(t.id)}
                >
                  {editingId === t.id ? (
                    <input   className="edit-input"
                      value={editText}
                      autoFocus
                      onChange={(e) => setEditText(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSave(t.id);
                        }
                      }}
                    />
                  ) : (
                    <span>{t.content}</span>
                  )}

                  <div className="actions">
                    {editingId === t.id ? (
                      <button
                        className="save-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSave(t.id);
                        }}
                      >
                        💾
                      </button>
                    ) : (
                      <button
                        className="edit-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(t.id);
                          setEditText(t.content);
                        }}
                      >
                        ✏️
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(t.id);
                      }}
                      className="delete-btn"
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
