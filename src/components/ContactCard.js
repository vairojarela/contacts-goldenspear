import React from "react";
import { Link } from "react-router-dom";
const ContactCard = ({ connection }) => {
  return (
    <Link to={`/${connection.id}`}>
      <div className="card">
        <img src={connection.avatar} className="card-img-top" alt="..."></img>
        <div className="card-body">
          <p className="card-text">{connection.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default ContactCard;
