import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CustomerList.css'; // We'll add custom styles here

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/customers')
      .then(res => res.json())
      .then(data => setCustomers(data));
  }, []);

  return (
    <div className="container py-4 min-vh-100 d-flex flex-column justify-content-between">
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Οι πελάτες μου</h2>
          <Link to="/add" className="btn btn-success">Προσθήκη Πελάτη</Link>
        </div>
        <div className="row">
          {customers.map(customer => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={customer.id}>
              <div className="customer-card shadow-sm">
                <div className="customer-card-header">
                  <h5 className="mb-2">{customer.name}</h5>
                  <span className={`badge status-badge ${customer.status === 'Completed' ? 'bg-success' : 'bg-secondary'}`}>
                    {customer.status}
                  </span>
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <Link to={`/edit/${customer.id}`} className="btn btn-outline-primary btn-sm">Προβολή Στοιχείων</Link>
                  <Link to={`/rooms/${customer.id}`} className="btn btn-outline-secondary btn-sm">Προβολή Δωματίων</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default CustomerList;