import React, { useEffect, useState } from 'react';

export default function AdminDashboard(){
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load(){
    setLoading(true);
    const res = await fetch('http://localhost:4000/api/companies');
    const data = await res.json();
    setCompanies(data);
    setLoading(false);
  }

  useEffect(()=>{ load(); }, []);

  async function updateStatus(id, status){
    await fetch(`http://localhost:4000/api/companies/${id}/verify`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ status })
    });
    load();
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Status</th><th>Document</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.status}</td>
              <td>{c.document_path ? <a href={`http://localhost:4000${c.document_path}`} target="_blank" rel="noreferrer">View</a> : '—'}</td>
              <td>
                <button onClick={()=>updateStatus(c.id, 'verified')}>Verify</button>
                <button onClick={()=>updateStatus(c.id, 'rejected')}>Reject</button>
                <button onClick={()=>updateStatus(c.id, 'pending')}>Reset</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
