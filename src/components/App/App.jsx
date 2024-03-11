import React, { Component } from 'react';
import shortid from 'shortid';
import SectionTitle from '../SectionTitle/SectionTitle';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import css from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    try {
      const savedContacts = localStorage.getItem('contacts');
      const parsedContacts = JSON.parse(savedContacts);

      if (parsedContacts !== null) {
        this.setState({ contacts: parsedContacts });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    try {
      if (prevState.contacts.length !== this.state.contacts.length) {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  addContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };
    const isExist = this.state.contacts.find(
      contact => contact.name.trim().toLowerCase() === name.trim().toLowerCase()
    );

    if (isExist) {
      alert(`${name} is already in contacts`);
      return;
    }
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilterChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <main className={css.appContainer}>
        <SectionTitle text="Phonebook" />
        <ContactForm addContact={this.addContact} />

        <SectionTitle text="Contacts" />
        <Filter
          filter={this.state.filter}
          filterChangeHandler={this.handleFilterChange}
        />
        <ContactList
          contacts={this.state.contacts.filter(contact =>
            contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
          )}
          onDeleteContact={this.deleteContact}
        />
      </main>
    );
  }
}

export default App;
