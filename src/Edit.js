import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8081/${id}`)
            .then(res => res.json())
            .then(data => {
                setName(data.name);
                setPhone(data.phone);
                setEmail(data.email);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8081/update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, email }),
        })
        .then(res => {
            if (res.ok) navigate('/');
        });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className='bg-white rounded w-50 p-5 shadow'>
                <h2>Edit Entry</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" value={name}
                        onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input type="text" className="form-control" value={phone}
                        onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
        </div>
    );
}

export default Edit;