import { useState } from 'react';
import api from '../services/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'member' });

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await api.post('/users/register', form);
    alert('Registered successfully');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} placeholder="Name" />
      <input name="email" onChange={handleChange} placeholder="Email" />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" />
      <select name="role" onChange={handleChange}>
        <option value="member">Member</option>
        <option value="president">President</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}
