import React from 'react';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';

export default function App(){
  const [page, setPage] = React.useState('register');
  return (
    <div style={{fontFamily: 'Arial, sans-serif', padding: 20}}>
      <header style={{display:'flex', gap:10, marginBottom:20}}>
        <button onClick={()=>setPage('register')}>Register Company</button>
        <button onClick={()=>setPage('admin')}>Admin Dashboard</button>
      </header>
      {page === 'register' && <Register />}
      {page === 'admin' && <AdminDashboard />}
    </div>
  );
}
