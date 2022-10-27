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

    this.toggleModal();
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
        <h1 style={{ textAlign: "center" }}>Click to add a new contact</h1>
        <button
          type="button"
          onClick={this.toggleModal}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "180px",
            height: "50px",
            backgroundColor: "transparent",
            borderRadius: "5px",
            padding: "5px",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          Open PhoneBook
        </button>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <h2 style={{ textAlign: "center", position: "relative" }}>Phonebook: </h2>
            <Form onSubmit={this.addContact} />
            <button
              type="button"
              onClick={this.toggleModal}
              style={{
                position: "absolute",
                top: "6px",
                right: "10px",
                display: "block",
                width: "55px ",
                backgroundColor: "transparent",
                borderRadius: "5px",
                padding: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
            <p
              style={{
                textAlign: "center",
                marginBottom: "0",
                marginTop: "30px",
                fontSize: "15px",
                fontWeight: "bold",
                color: "red",
              }}
            >
              Please, enter name and number user
            </p>
          </Modal>
        )}

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
