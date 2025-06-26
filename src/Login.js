import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://appbackend-production-a266.up.railway.app/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(async res => {
        if (res.ok) {
          const data = await res.json();
          onLogin(data.name);
        } else {
          const err = await res.json();
          setError(err.message || 'Σφάλμα σύνδεσης.');
        }
      })
      .catch(() => setError('Σφάλμα σύνδεσης με τον διακομιστή.'));
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-grow-1" style={{ minHeight: '80vh' }}>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow" style={{ minWidth: 320 }}>
        <h2 className="mb-4 text-center">Σύνδεση</h2>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <div className="mb-3">
          <label className="form-label">Όνομα χρήστη</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoFocus
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Κωδικός</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">Είσοδος</button>
      </form>
    </div>
  );
}

export default Login;