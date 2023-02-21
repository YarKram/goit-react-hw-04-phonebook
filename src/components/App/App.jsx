import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) || [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onInputChange = evt => {
    setFilter(evt.currentTarget.value);
  };

  const onFormSubmit = evt => {
    evt.preventDefault();

    const contact = {
      id: nanoid(),
      name: evt.currentTarget.name.value,
      number: evt.currentTarget.number.value,
    };

    if (
      contacts.find(contact => contact.name === evt.currentTarget.name.value)
    ) {
      return alert(`${contact.name} is already in contacts`);
    }

    setContacts([...contacts, contact]);

    evt.currentTarget.name.value = '';
    evt.currentTarget.number.value = '';
  };

  const onDelete = contactId => {
    setContacts(contacts.filter(contact => contactId !== contact.id));
  };

  const normalizedContacts = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedContacts)
  );

  return (
    <div style={{ marginLeft: 20 }}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onFormSubmit} />

      <h2>Contacts</h2>
      <Filter changeFilterValue={onInputChange} />
      <br />
      <ContactList deleteContact={onDelete} contacts={visibleContacts} />
    </div>
  );
};

export default App;
