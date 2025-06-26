import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';

function Header({ customerName, userName, onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const { id } = useParams();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="d-flex justify-content-between align-items-center px-4 py-3 custom-header border-bottom mb-4">
      <nav>
        <Link to="/" className="me-4 text-decoration-none text-dark fw-bold underline-home header-link">Αρχική Σελίδα</Link>
        <Link to="/add" className="me-4 text-decoration-none text-dark fw-bold header-link">Εισαγωγή Πελάτη</Link>
        <Link to="/customers" className="text-decoration-none text-dark fw-bold header-link">Οι πελάτες μου</Link>
      </nav>
      <div className="d-flex align-items-center">
        {(location.pathname.startsWith('/edit/') || location.pathname.startsWith('/rooms/')) && customerName && (
          <span className="fw-bold text-secondary me-3">{customerName}</span>
        )}
        <div className="position-relative" ref={dropdownRef}>
          <button
            className="btn btn-link p-0 settings-btn"
            style={{ fontSize: '1.5rem', color: '#343a40' }}
            onClick={() => setShowDropdown(v => !v)}
            aria-label="Settings"
          >
            <FaCog />
          </button>
          {showDropdown && (
            <div className="dropdown-menu dropdown-menu-end show mt-2" style={{ right: 0, left: 'auto', minWidth: 140 }}>
              <div className="dropdown-item-text text-center mb-2">
                <strong>{userName}</strong>
              </div>
              <button className="dropdown-item text-danger" onClick={onLogout}>Αποσύνδεση</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;