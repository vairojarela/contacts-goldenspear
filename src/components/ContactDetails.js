import React, { useState } from "react";
import ContactCard from "./ContactCard";
import SearchInput from "./SearchInput";
import clients from "../clients.json";

const ContactDetails = props => {
  const [searchTerm, setSearchTerm] = useState("");
  const { params } = props.match;
  const thisClient = props.clients.find(
    client => client.id === Number(params.id)
  );
  const connectionsOfClient = thisClient.connections.map(connection => {
    for (let i = 0; i < clients.length; i++) {
      if (clients[i].id === connection) return clients[i];
    }
  });
  console.log(connectionsOfClient);

  const handleChange = event => {
    if (event.target.value) setSearchTerm(event.target.value);
    else if (event.target.innerText) setSearchTerm(event.target.innerText);
    console.log(event.target.innerText);
  };

  const filteredConnections = !searchTerm
    ? connectionsOfClient
    : connectionsOfClient.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );

  return (
    <main className="col-7">
      <header style={contactHeader}>
        <img
          className="avatar-img"
          height="50"
          src={thisClient.avatar}
          alt={thisClient.name}
        />
        <h2>{thisClient.name}</h2>
        <input placeholder="Search..." onChange={handleChange}></input>
      </header>
      <div className="card-columns">
        {filteredConnections.map((connection, index) => {
          return <ContactCard connection={connection} />;
        })}
      </div>
    </main>
  );
};

const contactHeader = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "1%"
};

export default ContactDetails;
