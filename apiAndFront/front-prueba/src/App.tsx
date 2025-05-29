import { useEffect, useState } from "react";

type User = { nombre: string; edad: number; _id: string };

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [nombre, setNombre] = useState(""); // Estado para el input nombre
  const apiUrl = import.meta.env.VITE_API_URL;

  // GET all users
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${apiUrl}/users`);
      if (!res.ok) throw new Error("Error al cargar usuarios");
      const data: User[] = await res.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  // DELETE user by ID
  const deleteUser = async (id: string) => {
    try {
      const res = await fetch(`${apiUrl}/users/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar usuario");
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  // POST user con nombre dinámico
  const addUser = async () => {
    if (!nombre.trim()) return alert("El nombre no puede estar vacío");
    try {
      const res = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, edad: 21 }),
      });
      if (!res.ok) throw new Error("Error al agregar usuario");
      setNombre(""); // Limpiar input después de agregar
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Front desde el</h1>
      <input
        type="text"
        placeholder="Nombre usuario"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <button onClick={addUser}>Agregar usuario</button>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.nombre} - {u.edad} años
            <button onClick={() => deleteUser(u._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
