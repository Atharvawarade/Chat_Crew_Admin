import React from 'react';
import './Card.css';

const Card = ({ title, content, onClick }) => {
  return (
    <div className="col-md-4" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="card my-2">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
