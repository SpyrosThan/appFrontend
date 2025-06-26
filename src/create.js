import React from 'react';
import { useNavigate } from 'react-router-dom';

function Create() {
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [email, setEmail] = React.useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEntry = { name, phone, email };
        fetch('http://localhost:8081/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEntry),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log('Success:', data);
            // Redirect to home page after successful creation
            navigate('/');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className='bg-white rounded w-50 p-5 shadow'>
                <h2>Create New Entry</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control"
                        onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input type="text" className="form-control"
                        onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control"
                        onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    );
}
export default Create;