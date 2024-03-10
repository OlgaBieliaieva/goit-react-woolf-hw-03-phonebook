import React, { Component } from 'react';
import shortid from 'shortid';
import SectionTitle from '../SectionTitle/SectionTitle';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import contacts from '../../contacts.json';
import css from './App.module.css';

class App extends Component {
  
  state = {
    contacts: contacts,
    filter: '',
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };
    const contactNames = [];
    this.state.contacts.map(contact => contactNames.push(contact.name));

    if (contactNames.includes(name)) {
      alert(`${name} is already in contacts`);
    }
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = e => {
    const contactId = e.target.id;
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
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
          contacts={this.state.contacts}
          query={this.state.filter}
          onDeleteContact={this.deleteContact}
        />
      </main>
    );
  }
}

export default App;
