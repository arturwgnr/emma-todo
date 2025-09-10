import { useNavigate } from "react-router-dom";
export default function Landing() {

  const nav = useNavigate();

  function handleLogin() {
    nav("/manu-linda/Dashboard")
  }

  return (
    <div className="landing-wrapper">
      <div className="landing-card">
        <h2  className="landing-subtitle">Manu’s Space</h2>
        <h1 className="landing-title">Bem-vinda, princesa ✨</h1>
        <p className="landing-text">Seu espaço de organização pessoal</p>
        <button onClick={handleLogin} className="landing-button">Entrar</button>
      </div>
    </div>
  );
}
