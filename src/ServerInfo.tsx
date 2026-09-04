import { useEffect, useState } from "react";
import "./ServerInfo.css";

interface TaskFlowInfo {
  app: string;
  version: string;
}

const API_BASE = "http://52.87.135.237:8080";

function ServerInfo() {
  const [info, setInfo] = useState<TaskFlowInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/info`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: TaskFlowInfo) => setInfo(data))
      .catch((err: Error) => setError(err.message));
  }, []);

  if (error) {
    return <div className="si-error">Error: {error}</div>;
  }

  if (!info) {
    return <div className="si-loading">Cargando...</div>;
  }

  return (
    <div className="si-container">
      <h1>Server Info</h1>
      <p className="si-app">App: {info.app}</p>
      <p className="si-version">Version: {info.version}</p>
    </div>
  );
}

export default ServerInfo;