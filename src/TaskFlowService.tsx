import { useEffect, useState } from "react";
import "./TaskFlowService.css";

// TIP: revisa el schema "TaskResponse" en tu Swagger (sección Schemas, al final
// de la página) para confirmar que estos campos coinciden exactamente.
interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

const API_BASE = "https://d3ujwk09smrk9z.cloudfront.net";

function TaskFlowService() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTasks() {
      try {
        // 1. Login para obtener el token JWT
        // (usuario de prueba sembrado por el maestro: ana / ana123)
        const loginResponse = await fetch(`${API_BASE}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: "ana", password: "ana123" }),
        });

        if (!loginResponse.ok) {
          throw new Error("No se pudo iniciar sesión");
        }

        const { token } = await loginResponse.json();

        // 2. Pedir la lista de tareas mandando el token
        const tasksResponse = await fetch(`${API_BASE}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!tasksResponse.ok) {
          throw new Error("No se pudo obtener las tareas");
        }

        const data: Task[] = await tasksResponse.json();
        setTasks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      }
    }

    loadTasks();
  }, []);

  if (error) {
    return <div className="tf-error">Error: {error}</div>;
  }

  if (!tasks) {
    return <div className="tf-loading">Cargando...</div>;
  }

  return (
    <div className="tf-container">
      <div className="tf-header">
        <h1>Tareas</h1>
        <button className="tf-new-btn">+ Nueva tarea</button>
      </div>

      <div className="tf-grid">
        {tasks.map((task) => (
          <div key={task.id} className="tf-card">
            <div className="tf-avatar">
              {task.title.slice(0, 2).toUpperCase()}
            </div>
            <h2 className="tf-title">{task.title}</h2>
            <p className="tf-status">{task.status}</p>
            <p className="tf-description">{task.description}</p>

            <div className="tf-actions">
              <button className="tf-edit">✏️</button>
              <button className="tf-delete">🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskFlowService;