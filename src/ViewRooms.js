import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ViewRooms({ setCustomerName }) {
  const { customerId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [customerName, setLocalCustomerName] = useState('');

  const fetchRooms = () => {
    fetch(`http://localhost:8081/rooms/${customerId}`)
      .then(res => res.json())
      .then(data => setRooms(data));
  };

  useEffect(() => {
    fetchRooms();
  }, [customerId]);

  useEffect(() => {
    // Fetch customer name
    fetch(`http://localhost:8081/customers/${customerId}`)
      .then(res => res.json())
      .then(data => {
        setCustomerName && setCustomerName(data.name);
        setLocalCustomerName(data.name);
      });
    // Cleanup
    return () => setCustomerName && setCustomerName('');
  }, [customerId, setCustomerName]);

  const handleAddRoom = () => {
    setShowPrompt(true);
  };

  const handleRoomSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8081/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ room_name: roomName, customer_id: customerId })
    })
      .then(res => {
        if (res.ok) {
          setShowPrompt(false);
          setRoomName('');
          fetchRooms();
        }
      });
  };

  return (
    <div className="container py-4">
      <h2>
        Δωμάτια Πελάτη
        {customerName && (
          <span className="ms-3 text-secondary" style={{ fontWeight: 400, fontSize: '1.7rem' }}>
            {customerName}
          </span>
        )}
      </h2>
      <button className="btn btn-success mb-3" onClick={handleAddRoom}>Προσθήκη Δωματίου</button>
      {showPrompt && (
        <form onSubmit={handleRoomSubmit} className="mb-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Room Name"
              value={roomName}
              onChange={e => setRoomName(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">Προσθήκη</button>
            <button type="button" className="btn btn-secondary" onClick={() => setShowPrompt(false)}>Ακύρωση</button>
          </div>
        </form>
      )}
      <ul className="list-group">
        {rooms.map(room => (
          <li key={room.id} className="list-group-item">{room.room_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ViewRooms;