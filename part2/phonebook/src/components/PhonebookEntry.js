import contacts from '../services/contactService';

const PhonebookEntry = ({ name, number, id, persons, setPersons, notify }) => {
  const deleteMe = () => {
    if (window.confirm(`Delete ${name}?`)) {
      contacts
        .deleteById(id)
        .then((res) => {
          notify(`${name} successfully deleted`, 'success');
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((err) => {
          if (err.response?.status === 404) {
            notify(
              `seems like ${name} doesn't exist in the db anymore`,
              'error'
            );
            setPersons(persons.filter((person) => person.id !== id));
          } else notify(err.toString(), 'error');
        });
    }
  };
  return (
    <div className="contact">
      {name} {number} <button onClick={deleteMe}>delete</button>
    </div>
  );
};
export default PhonebookEntry;
