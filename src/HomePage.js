import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

function HomePage({ userName }) {
  const [pendingCustomers, setPendingCustomers] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/customers-pending')
      .then(res => res.json())
      .then(setPendingCustomers);

    fetch('http://localhost:8081/customer-stats')
      .then(res => res.json())
      .then(setStats);
  }, []);

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

  // Helper to format and color the due date with label
  const renderDueDate = (delivery_date) => {
    if (!delivery_date) return null;
    const today = new Date();
    const due = new Date(delivery_date);
    const isPast = due < today.setHours(0,0,0,0);
    const color = isPast ? '#dc3545' : '#ffc107'; // red or yellow
    return (
      <span style={{ color, fontWeight: 600, marginLeft: 8 }}>
        Ημερομηνία Παράδοσης: {due.toLocaleDateString('el-GR')}
      </span>
    );
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">
        Γειά σας{userName ? `, ${userName}` : ''}!
      </h2>
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
                    <span>
                      {c.name}
                      {c.delivery_date && (
                        <>
                          <span style={{ margin: '0 8px', color: '#bbb' }}>|</span>
                          {renderDueDate(c.delivery_date)}
                        </>
                      )}
                    </span>
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
            {stats.length === 0 ? (
              <div className="text-muted">Δεν υπάρχουν δεδομένα για αυτόν τον μήνα.</div>
            ) : (
              <Pie data={pieData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;