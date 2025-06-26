import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditCustomer({ setCustomerName }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', job: '', address: '', id_number: '', phone: '', doy: '', email: '', delivery_date: '', status: 'Pending'
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8081/customers/${id}`)
      .then(res => res.json())
      .then(data => {
        // Ensure all fields are present
        setForm({
          name: data.name || '',
          job: data.job || '',
          address: data.address || '',
          id_number: data.id_number || '',
          phone: data.phone || '',
          doy: data.doy || '',
          email: data.email || '',
          delivery_date: data.delivery_date ? data.delivery_date.substring(0, 10) : '',
          status: data.status || 'Pending'
        });
        setCustomerName && setCustomerName(data.name);
      });
    return () => setCustomerName && setCustomerName('');
  }, [id, setCustomerName]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:8081/customers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (res.ok) navigate('/customers');
      });
  };

  // Show modal instead of immediate delete
  const handleDelete = () => {
    setShowModal(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    fetch(`http://localhost:8081/customers/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) navigate('/customers');
      });
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Επεξεργασία Πελάτη</h2>
        <button className="btn btn-danger" onClick={() => setShowModal(true)}>
          Διαγραφή Πελάτη
        </button>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">Name</label>
            <input name="name" className="form-control" value={form.name} onChange={handleChange} required />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Job</label>
            <input name="job" className="form-control" value={form.job} onChange={handleChange} />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Address</label>
            <input name="address" className="form-control" value={form.address} onChange={handleChange} />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">ID</label>
            <input name="id_number" className="form-control" value={form.id_number} onChange={handleChange} />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Phone</label>
            <input name="phone" className="form-control" value={form.phone} onChange={handleChange} />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">DOY</label>
            <input name="doy" className="form-control" value={form.doy} onChange={handleChange} />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Email</label>
            <input name="email" type="email" className="form-control" value={form.email} onChange={handleChange} />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Delivery Date</label>
            <input name="delivery_date" type="date" className="form-control" value={form.delivery_date} onChange={handleChange} />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Status</label>
            <select name="status" className="form-control" value={form.status} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Canceled">Canceled</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Αποθήκευση</button>
      </form>

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop-custom">
          <div className="modal-custom">
            <div className="modal-header-custom">
              <h5 className="modal-title">Επαλήθευση Διαγραφής</h5>
            </div>
            <div className="modal-body">
              Είστε σίγουροι ότι θέλετε ο πελάτης <strong>{form.name}</strong> να διαγραφεί;
            </div>
            <div className="modal-footer-custom">
              <button className="btn btn-danger me-2" onClick={confirmDelete}>Ναί</button>
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Όχι</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditCustomer;