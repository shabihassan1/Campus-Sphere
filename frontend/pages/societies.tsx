import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Societies() {
  const [societies, setSocieties] = useState([]);

  useEffect(() => {
    api.get('/societies').then(res => setSocieties(res.data));
  }, []);

  const joinSociety = async (societyId: string) => {
    const userId = 'mock-user-id'; // Replace with real user ID from auth/session
    await api.post('/membership/join', { userId, societyId });
    alert('Join request sent');
  };

  return (
    <div>
      {societies.map((soc: any) => (
        <div key={soc.id}>
          <h2>{soc.name}</h2>
          <p>{soc.description}</p>
          <button onClick={() => joinSociety(soc.id)}>Join</button>
        </div>
      ))}
    </div>
  );
}
