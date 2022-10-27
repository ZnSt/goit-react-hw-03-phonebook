import shortid from "shortid";
import { Component } from "react";
import { Form } from "./Form";
import { ContactsList } from "./ContactsList";
import { Filter } from "./Filter";

export class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],

    filter: "",
  };

  addContact = (name, number) => {
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));

    if (this.state.contacts.some((contact) => contact.name === name)) {
      return alert(`${name} is already in contacts`);
    }
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== contactId),
    }));
  };

  changeFilter = (event) => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleName = () => {
    const { filter, contacts } = this.state;
    const normilizedFilter = filter.toLowerCase().trim();

    return contacts.filter((contact) => contact.name.toLowerCase().includes(normilizedFilter));
  };

  render() {
    const { contacts, filter } = this.state;

    const filterName = this.getVisibleName();

    return (
      <>
        <h2>Phonebook</h2>
        <Form onSubmit={this.addContact} />
        <h2>Contacts:</h2>
        <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
          <p>Total contacts: {contacts.length}</p>
        </div>

        <Filter value={filter} onChange={this.changeFilter} />
        <ContactsList contacts={filterName} onDeleteContact={this.deleteContact} />
      </>
    );
  }
}
