import axios from "axios";
import { useEffect, useState } from "react"

const instance = axios.create({
  baseURL: 'http://localhost:8888/api',
});

export default function User() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSave = async () => {
    try {
      const response = await instance.post('/users', {
        name,
        email,
        password,
      });

      console.log({ response });
    } catch (error) {
      console.log({ error });
    }
  };

  const loadUsers = async () => {
    try {
      const response = await instance.get('/users');

      if (!response.data) {
        throw new Error();
      }

      setUsers(response.data);
    } catch (error) {
      console.log({ error });
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      {users.length !== 0 && users?.map((user: { name: string }) => (
        <p>{user?.name}</p>
      ))}

      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSave}>Save</button>
    </div>
  )
}