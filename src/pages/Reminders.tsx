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

  // 🔹 Carregar direto do localStorage
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const saved = localStorage.getItem("savedReminders");
    return saved ? JSON.parse(saved) : [];
  });

  const [reminder, setReminder] = useState("");
  const [date, setDate] = useState("");

  // 🔹 Salvar sempre que reminders mudar
  useEffect(() => {
    localStorage.setItem("savedReminders", JSON.stringify(reminders));
  }, [reminders]);

  function handleAddReminder() {
    if (!reminder.trim() || !date) return;

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

  // 🔹 Ordenação: importantes primeiro, depois data crescente
  const sortedReminders = [...reminders].sort((a, b) => {
    if (a.important !== b.important) return a.important ? -1 : 1;
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
                  title="Marcar como importante"
                >
                  ⭐
                </button>
                <button
                  className="reminder-delete-btn"
                  onClick={() => handleDelete(r.id)}
                  title="Excluir lembrete"
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
