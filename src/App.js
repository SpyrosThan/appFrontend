import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';
import EditCustomer from './EditCustomer';
import ViewRooms from './ViewRooms';
import Header from './Header';
import Footer from './Footer';
import Login from './Login'; // Add this import
import 'bootstrap/dist/css/bootstrap.min.css';

function AppContent() {
  const [customerName, setCustomerName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  if (!isAuthenticated) {
    return (
      <div className="min-vh-100 d-flex flex-column" style={{ background: "#f5f5f5" }}>
        <Login
          onLogin={name => {
            setIsAuthenticated(true);
            setUserName(name);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ background: "#f5f5f5" }}>
      <Header
        customerName={customerName}
        userName={userName}
        onLogout={() => {
          setIsAuthenticated(false);
          setUserName('');
        }}
      />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage userName={userName} />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/add" element={<CustomerForm />} />
          <Route path="/edit/:id" element={<EditCustomer setCustomerName={setCustomerName} />} />
          <Route path="/rooms/:customerId" element={<ViewRooms setCustomerName={setCustomerName} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
