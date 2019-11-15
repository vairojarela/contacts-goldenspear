import React from "react";
import { Link } from "react-router-dom";
import clients from "../clients.json";

const Contacts = () => {
  console.log(clients);
  return (
    <aside className="col-5" style={asideStyles}>
      <ul>
        {clients.map((client, index) => {
          return (
            <li key={index}>
              <Link to={`/` + client.id}>{client.name}</Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

const asideStyles = {
  height: "100%",

  backgroundColor: "beige"
};

export default Contacts;
