import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

Chart.register(ArcElement, Tooltip, Legend);

function Home() {
  const [pendingCustomers, setPendingCustomers] = useState([]);
  const [stats, setStats] = useState([]);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/customers-pending')
      .then(res => res.json())
      .then(setPendingCustomers);

    fetch('http://localhost:8081/customer-stats')
      .then(res => res.json())
      .then(setStats);
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:8081/')
        .then(response => setData(response.data))
        .catch(error => console.error('Error fetching data:', error));
};

  React.useEffect(() => {
      fetchData();
  }, []);

  const handleDelete = (id) => {
      if (window.confirm('Are you sure you want to delete this entry?')) {
          axios.delete(`http://localhost:8081/delete/${id}`)
              .then(() => fetchData())
              .catch(error => console.error('Error deleting data:', error));
      }
  };

  // Prepare pie chart data
  const pieData = {
    labels: stats.map(s => {
      if (s.status === 'Completed') return 'Ολοκληρώθηκαν';
      if (s.status === 'Pending') return 'Σε εκκρεμότητα';
      if (s.status === 'Canceled') return 'Ακυρώθηκαν';
      return s.status;
    }),
    datasets: [
      {
        data: stats.map(s => s.count),
        backgroundColor: [
          '#198754', // green for completed
          '#ffc107', // yellow for pending
          '#dc3545', // red for canceled
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container py-5">
      <div className="row">
        {/* Pending Customers List */}
        <div className="col-md-6 mb-4">
          <div className="bg-white rounded shadow p-4 h-100">
            <h4 className="mb-3">Πελάτες σε εκκρεμότητα</h4>
            {pendingCustomers.length === 0 ? (
              <div className="text-muted">Δεν υπάρχουν πελάτες σε εκκρεμότητα.</div>
            ) : (
              <ul className="list-group">
                {pendingCustomers.map(c => (
                  <li key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{c.name}</span>
                    <Link to={`/edit/${c.id}`} className="btn btn-outline-primary btn-sm">Προβολή</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {/* Pie Chart */}
        <div className="col-md-6 mb-4 d-flex align-items-center">
          <div className="bg-white rounded shadow p-4 w-100">
            <h4 className="mb-3">Στατιστικά Παραγγελιών (Αυτόν τον μήνα)</h4>
            <Pie data={pieData} />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center vh-100">
            <div className='bg-white rounded w-50 p-5 shadow'>
                <h2>My Crud App</h2>
                <Link to="/create" className="btn btn-success mb-3">Add New</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                                <td>{item.email}</td>
                                <td>
                                    <Link to={`/edit/${item.id}`} className="btn btn-primary me-2">Edit</Link>
                                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}

export default Home;