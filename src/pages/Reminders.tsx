import "./css/reminders.css";
import { useState, useEffect } from "react";

export default function Reminders() {
  interface Reminder {
    id: number;
    title: string;
    date: string;
    timestamp: number;
    important: boolean;
  }

  const [reminder, setReminder] = useState("");
  const [date, setDate] = useState("");
  const [reminders, setReminders] = useState<Reminder[]>([]);

  // 🔹 Carregar do localStorage ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem("savedReminders");
    if (saved) setReminders(JSON.parse(saved));
  }, []);

  // 🔹 Salvar sempre que reminders mudar
  useEffect(() => {
    localStorage.setItem("savedReminders", JSON.stringify(reminders));
  }, [reminders]);

  function handleAddReminder() {
    if (!reminder || !date) return;

    const newReminder: Reminder = {
      id: Date.now(),
      title: reminder,
      date: new Date(date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      timestamp: new Date(date).getTime(),
      important: false,
    };

    setReminders([...reminders, newReminder]);
    setReminder("");
    setDate("");
  }

  function handleDelete(id: number) {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  }

  function toggleImportant(id: number) {
    setReminders((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, important: !r.important } : r
      )
    );
  }

  // 🔹 Ordenação: importantes primeiro, depois por data
  const sortedReminders = [...reminders].sort((a, b) => {
    if (a.important !== b.important) return b.important ? 1 : -1;
    return a.timestamp - b.timestamp;
  });

  return (
    <div className="reminders-wrapper">
      {/* Header */}
      <div className="reminders-header">
        <h1 className="reminders-title">Lembretes 📅</h1>
        <p className="reminders-subtitle">
          Memória de peixe agora não é desculpa 🐠
        </p>

        <div className="reminders-input-area">
          <input
            type="text"
            placeholder="Novo lembrete"
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
            className="reminders-input"
          />
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="reminders-date"
          />
          <button onClick={handleAddReminder} className="reminders-add-btn">
            Adicionar
          </button>
        </div>
      </div>

      {/* Lista de lembretes */}
      <div className="reminders-list">
        {sortedReminders.length === 0 ? (
          <p className="reminders-empty"></p>
        ) : (
          sortedReminders.map((r) => (
            <div
              key={r.id}
              className={`reminder-card ${r.important ? "important" : ""}`}
            >
              <div className="reminder-actions">
                <button
                  className="reminder-important-btn"
                  onClick={() => toggleImportant(r.id)}
                >
                  ⭐
                </button>
                <button
                  className="reminder-delete-btn"
                  onClick={() => handleDelete(r.id)}
                >
                  ✖
                </button>
              </div>
              <h3 className="reminder-title">{r.title}</h3>
              <p className="reminder-date">{r.date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
