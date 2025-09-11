import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./topbar.css";

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  function handleLogout() {
    nav("/");
  }

  function handleMainPage() {
    nav("/manu-linda/Dashboard");
  }

  return (
    <header className="topbar">
      {/* Logo */}
      <div className="topbar-logo">
        <span className="manu-space" onClick={handleMainPage}>
          🌸 Manu’s Space
        </span>
      </div>

      {/* Navegação desktop */}
      <nav className={`topbar-nav ${open ? "open" : ""}`}>
        <Link to="/manu-gatona/toDoList" className="nav-btn">
          To-Do
        </Link>
        <Link to="/manu-gatona/goals" className="nav-btn">
          Goals
        </Link>
        <Link to="/manu-gatona/reminders" className="nav-btn">
          Reminders
        </Link>
      </nav>

      {/* User / menu toggle */}
      <div className="topbar-actions">
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
        <button className="menu-toggle" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>
    </header>
  );
}
