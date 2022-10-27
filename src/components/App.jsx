import shortid from "shortid";
import { Component } from "react";
import { Form } from "./Form";
import { ContactsList } from "./ContactsList";
import { Filter } from "./Filter";
import { Modal } from "./Modal";

export class App extends Component {
  state = {
    contacts: [],

    filter: "",
    showModal: false,
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

  componentDidMount() {
    const contactsArr = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contactsArr);

    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { contacts, filter, showModal } = this.state;

    const filterName = this.getVisibleName();

    return (
      <>
        <button type="button" onClick={this.toggleModal}>
          Open Modal
        </button>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <h1>Hello, its modal!</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
            <button type="button" onClick={this.toggleModal}>
              Close
            </button>
          </Modal>
        )}

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
