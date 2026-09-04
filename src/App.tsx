import { useState } from "react";
import ServerInfo from "../src/ServerInfo";
/*import ProjectsCrud from "../src/ProjectsCrud";
import TaskFlowService from "../src/TaskFlowService"; */
import "./App.css";

type View = "info" | "projects" | "tasks";

function App() {
  const [view, setView] = useState<View>("info");

  return (
    <div>
      <nav className="app-nav">
        <button
          className={view === "info" ? "active" : ""}
          onClick={() => setView("info")}
        >
          Entregable 1: Server Info
        </button>
        <button
          className={view === "projects" ? "active" : ""}
          onClick={() => setView("projects")}
        >
          Fase 3: Proyectos CRUD
        </button>
        <button
          className={view === "tasks" ? "active" : ""}
          onClick={() => setView("tasks")}
        >
          Entregable 2: Tasks (JWT)
        </button>
      </nav>

      {view === "info" && <ServerInfo />}


    {/* {view === "projects" && <ProjectsCrud />}
      {view === "tasks" && <TaskFlowService />} * */} 
   
   
   
    </div>
  );
}

export default App;