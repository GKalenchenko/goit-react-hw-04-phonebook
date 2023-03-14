import { ContactElement } from 'components/ContactElement/ContactElement';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { SearchFilter } from 'components/SearchFilter/SearchFilter';
import { useState, useEffect, useRef } from 'react';
import { Wrapper } from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const onSubmit = newContact => {
    if (contacts.flatMap(el => el.name).includes(newContact.name)) {
      alert(`${newContact.name} already in contacts`);
      return;
    }

    setContacts(prevContacts => {
      return [...prevContacts, newContact];
    });
  };

  const onChange = ({ target }) => {
    setFilter(target.value);
  };

  const onClick = value => {
    setContacts(contacts.filter(contact => contact.name !== value));
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('contacts')) ?? false) {
      setContacts([...JSON.parse(localStorage.getItem('contacts'))]);
      return;
    }
  }, []);

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    try {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } catch (error) {
      console.log(error);
    }
  }, [contacts]);

  return (
    <Wrapper>
      <ContactForm contacts={contacts} onSubmit={onSubmit} />
      <ContactList>
        <SearchFilter onChange={onChange} />
        <ContactElement contacts={contacts} onClick={onClick} />
      </ContactList>
    </Wrapper>
  );
};
