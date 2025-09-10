import Topbar from "../components/Topbar";
import { useState, useEffect } from "react";
import "./css/todo.css";

export default function Todo() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [emptyMessage, setEmptyMessage] = useState<string>("");

  interface Task {
    id: number,
    content: string,
    done: boolean
  }

  const emptyMessages = [
    "Nada pra fazer? Really? 🤨",
    "Tá suave demais por aqui... 😴",
    "Zero tarefas? Nem parece você 😏",
    "Que preguiçosa gostosa 👄",
    "A vida tá ganha já? 🏖️",
    "Sem nada? Bora inventar algo! 🤔",
    "Nem uma tarefa? Que milagre ✨",
    "Tá esperando cair do céu? ☁️",
    "Vagabundagem isso ai ein? 🤓",
  ];

  // 🔹 Sempre que tasks ficar vazio, sorteia UMA frase
  useEffect(() => {
    if (tasks.length === 0) {
      const random = emptyMessages[Math.floor(Math.random() * emptyMessages.length)];
      setEmptyMessage(random);
    }
  }, [tasks]);

  function handleAddTask() {
    if (!task) return;

    const newTask = {
      id: Date.now(),
      content: task,
      done: false,
    };

    setTasks([...tasks, newTask]);
    setTask('');
  }

  function handleDelete(id: number) {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
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
                <li key={t.id}>
                  <span>{t.content}</span>
                  <div className="actions">
                    <button className="edit-btn">✏️</button>
                    <button
                      onClick={() => handleDelete(t.id)}
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
