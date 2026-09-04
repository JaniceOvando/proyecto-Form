import { useEffect, useState } from "react";
import "./ProjectsCrud.css";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function UsersCrud() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: User[]) => setUsers(data))
      .catch((err: Error) => setError(err.message));
  }, []);

  function handleDelete(id: number) {
    // DELETE a la API (JSONPlaceholder simula el borrado, no persiste)
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    }).then(() => {
      setUsers((prev) => prev?.filter((user) => user.id !== id) ?? null);
    });
  }

  if (error) return <div className="uc-error">Error: {error}</div>;
  if (!users) return <div className="uc-loading">Cargando...</div>;

  return (
    <div className="uc-container">
      <div className="uc-header">
        <h1>Usuarios</h1>
        <button className="uc-new-btn">+ Nuevo usuario</button>
      </div>

      <div className="uc-grid">
        {users.map((user) => (
          <div key={user.id} className="uc-card">
            <div className="uc-avatar">{getInitials(user.name)}</div>
            <h2 className="uc-name">{user.name}</h2>
            <p className="uc-username">@{user.username}</p>
            <a className="uc-email" href={`mailto:${user.email}`}>
              {user.email}
            </a>

            <div className="uc-actions">
              <button className="uc-edit">Editar</button>
              <button
                className="uc-delete"
                onClick={() => handleDelete(user.id)}
              >
                borrar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersCrud;