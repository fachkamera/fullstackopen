const FilterEntries = ({ filter, setFilter, persons }) => {
  const applyFilter = (e) => {
    const val = e.target.value.trim().toLowerCase();
    setFilter(val);
    persons.forEach((person) => {
      person.visible = person.name.toLowerCase().indexOf(val) > -1;
    });
  };
  return (
    <p>
      <label htmlFor="filter">filter shown with </label>
      <input
        id="filter"
        autoComplete="off"
        value={filter}
        onChange={applyFilter}
      />
    </p>
  );
};
export default FilterEntries;
