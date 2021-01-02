import contacts from '../services/contactService';

const AddNewEntry = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  filter,
  setFilter,
  persons,
  setPersons,
  notify,
}) => {
  const addPhonebookEntry = (e) => {
    e.preventDefault();
    setFilter('');
    if (persons.map((person) => person.name).includes(newName)) {
      if (
        window.confirm(
          `${newName} is already added to the phone book, replace the old number with the new one?`
        )
      ) {
        contacts
          .update(
            persons.find((person) => person.name === newName).id,
            newName,
            newNumber
          )
          .then(({ data }) => {
            const updatedPersons = persons;
            console.log(data);
            updatedPersons[
              persons.findIndex((person) => person.id === data.id)
            ] = {
              ...data,
              visible: true,
            };

            setPersons(updatedPersons);
            setNewName('');
            setNewNumber('');
          })
          .catch((err) => {
            notify(err.toString(), 'error');
          });
      }
    } else {
      const newContact = {
        name: newName,
        number: newNumber,
      };
      contacts
        .add(newContact)
        .then(({ data }) => {
          notify(`${newName} successfully added`, 'success');
          setPersons(persons.concat({ ...data, visible: true }));
          setNewName('');
          setNewNumber('');
        })
        .catch((err) => {
          notify(err.toString(), 'error');
        });
    }
  };
  return (
    <form onSubmit={addPhonebookEntry}>
      <dl>
        <div className="formGroup">
          <dt>name</dt>
          <dd>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </dd>
          <dt>number</dt>
          <dd>
            <input
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
            />
          </dd>
        </div>
      </dl>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default AddNewEntry;
