import "./App.css";
import Landing from "./pages/Landing";
import Todo from "./pages/Todo";
import Goals from "./pages/Goals";
import Reminders from "./pages/Reminders";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="manu-linda/Dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            
              <Landing />
            
          }
        />
        <Route
          path="/manu-gatona/toDoList"
          element={
            <Layout>
              <Todo />
            </Layout>
          }
        />

        <Route
          path="/manu-gatona/goals"
          element={
            <Layout>
              <Goals />
            </Layout>
          }
        />

        <Route
          path="/manu-gatona/reminders"
          element={
            <Layout>
              <Reminders />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
