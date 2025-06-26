import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CustomerForm() {
  const [form, setForm] = useState({
    name: '', job: '', address: '', id_number: '', phone: '', doy: '', email: '', delivery_date: '', status: 'Pending'
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://appbackend-production-a266.up.railway.app/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (res.ok) navigate('/'); // Redirect to front page on success
      });
  };

  return (
    <div className="container py-4">
      <h2>Προσθήκη Πελάτη</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">Επωνυμία</label>
            <input name="name" className="form-control" value={form.name} onChange={handleChange} required />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Επάγγελμα</label>
            <input name="job" className="form-control" value={form.job} onChange={handleChange} />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Διεύθυνση</label>
            <input name="address" className="form-control" value={form.address} onChange={handleChange} />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">ΑΦΜ</label>
            <input name="id_number" className="form-control" value={form.id_number} onChange={handleChange} />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Τηλέφωνο</label>
            <input name="phone" className="form-control" value={form.phone} onChange={handleChange} />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">ΔΟΥ</label>
            <input name="doy" className="form-control" value={form.doy} onChange={handleChange} />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Email</label>
            <input name="email" type="email" className="form-control" value={form.email} onChange={handleChange} />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Παράδοση</label>
            <input name="delivery_date" type="date" className="form-control" value={form.delivery_date} onChange={handleChange} />
          </div>
        </div>
        <button type="submit" className="btn btn-success">Προσθήκη Πελάτη</button>
      </form>
    </div>
  );
}

export default CustomerForm;