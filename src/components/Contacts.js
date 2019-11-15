import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Contacts = ({ clients }) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
  clients.sort((a, b) => a.name.localeCompare(b.name));
  const [searchTerm, setSearchTerm] = useState("");
  /*   const [clientsFromProps, setClients] = useState(clients);
   */

  const handleChange = event => {
    if (event.target.value) setSearchTerm(event.target.value);
    else if (event.target.innerText) setSearchTerm(event.target.innerText);
    console.log(event.target.innerText);
  };

  const filteredClients = !searchTerm
    ? clients
    : clients.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );
  /* 
  useEffect(() => {
    const filteredClients = clientsFromProps.filter(client => {
      return client.name.toLowerCase().includes(searchTerm);
    });

    setClients(filteredClients);
    //setClients(filteredClients);
  }, [clientsFromProps, searchTerm]);
 */
  return (
    <>
      <nav className="col-1">
        {alphabet.map((letter, index) => {
          return (
            <div style={alphabetStyles} key={index}>
              <button onClick={handleChange}>{letter}</button>
            </div>
          );
        })}
      </nav>
      <aside className="col-4" style={asideStyles}>
        <input type="text" onChange={handleChange} placeholder="Search..." />
        <ul>
          {filteredClients.map((client, index) => {
            return (
              <li key={index}>
                <Link to={`/` + client.id}>{client.name}</Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
};

const asideStyles = {
  height: "100%",
  backgroundColor: "beige"
};

const alphabetStyles = {
  textAlign: "center",
  height: "40px",
  overflowY: "scroll"
};

export default Contacts;
