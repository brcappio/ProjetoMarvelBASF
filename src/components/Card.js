import React from 'react';

function Card({ onClick, text, className }) {
    return (
        <div className="card" onClick={onClick}>
            <div className={`background-image ${className}`}></div>
            <div><p className="card-text">{text}</p></div>
        </div>
    );
}

export default Card;
