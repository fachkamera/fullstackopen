import React, { useState, useEffect } from 'react';
import PhonebookEntry from './components/PhonebookEntry';
import FilterEntries from './components/FilterEntries';
import AddNewEntry from './components/AddNewEntry';
import Notification from './components/Notification';
import contacts from './services/contactService';
import './App.scss';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({});

  const notify = (text, type) => {
    setNotification({
      text: text,
      type: type,
    });
    setTimeout(() => {
      setNotification({});
    }, 3000);
  };

  useEffect(() => {
    contacts
      .getAll()
      .then(({ data }) => {
        setPersons(data.map((person) => ({ ...person, visible: true })));
      })
      .catch((err) => {
        notify(err.toString(), 'error');
      });
  }, []);

  return (
    <div id="canvas">
      <Notification text={notification.text} type={notification.type} />

      <h1>Phone book</h1>

      <FilterEntries filter={filter} setFilter={setFilter} persons={persons} />

      <h2>add new</h2>
      <AddNewEntry
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        filter={filter}
        setFilter={setFilter}
        persons={persons}
        setPersons={setPersons}
        notify={notify}
      />

      <h2>numbers</h2>
      {persons.map((person) =>
        person.visible ? (
          <PhonebookEntry
            key={person.id}
            name={person.name}
            number={person.number}
            persons={persons}
            setPersons={setPersons}
            id={person.id}
            notify={notify}
          />
        ) : (
          ''
        )
      )}
    </div>
  );
};

export default App;
