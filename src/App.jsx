import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactForm from "./components/ContactForm/ContactForm";

function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = window.localStorage.getItem("saved-contacts");

    if (savedContacts !== null) {
      return JSON.parse(savedContacts);
    }

    return [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ];
  });

  useEffect(() => {
    window.localStorage.setItem("saved-contacts", JSON.stringify(contacts));
  }, [contacts]);

  const [filterValue, setFilterValue] = useState("");
  const handleFilter = (event) => {
    const value = event.target.value;
    setFilterValue(value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  const handleSubmit = (values, actions) => {
    const newContact = { ...values, id: nanoid() };

    setContacts([...contacts, newContact]);
    actions.resetForm();
  };

  const onDeleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm handleSubmit={handleSubmit} />
      <SearchBox value={filterValue} handleFilter={handleFilter} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={onDeleteContact}
      />
    </div>
  );
}

export default App;
