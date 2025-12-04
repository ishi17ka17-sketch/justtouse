import React, { useState } from 'react';

export default function Register(){
  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  function handleChange(e){
    setForm({...form, [e.target.name]: e.target.value});
  }

  async function handleSubmit(e){
    e.preventDefault();
    const fd = new FormData();
    Object.keys(form).forEach(k => fd.append(k, form[k]));
    if (file) fd.append('document', file);

    const res = await fetch('http://localhost:4000/api/companies', {
      method: 'POST',
      body: fd
    });
    if (res.ok){
      setMessage('Company registered successfully.');
      setForm({});
      setFile(null);
    } else {
      setMessage('Registration failed.');
    }
  }

  return (
    <div>
      <h2>Company Registration</h2>
      <form onSubmit={handleSubmit}>
        <div><label>Name: <input name="name" value={form.name||''} onChange={handleChange} required /></label></div>
        <div><label>Legal Name: <input name="legal_name" value={form.legal_name||''} onChange={handleChange} /></label></div>
        <div><label>Email: <input name="email" value={form.email||''} onChange={handleChange} type="email" /></label></div>
        <div><label>Phone: <input name="phone" value={form.phone||''} onChange={handleChange} /></label></div>
        <div><label>Address: <input name="address" value={form.address||''} onChange={handleChange} /></label></div>
        <div><label>Website: <input name="website" value={form.website||''} onChange={handleChange} /></label></div>
        <div><label>Description: <textarea name="description" value={form.description||''} onChange={handleChange}></textarea></label></div>
        <div><label>Document (PDF/Image): <input type="file" onChange={e=>setFile(e.target.files[0])} /></label></div>
        <div style={{marginTop:10}}><button type="submit">Register</button></div>
      </form>
      <div style={{marginTop:10}}>{message}</div>
    </div>
  );
}
