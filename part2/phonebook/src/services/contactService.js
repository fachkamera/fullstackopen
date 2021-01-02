import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res);
};

const add = (contact) => {
  const req = axios.post(baseUrl, contact);
  return req.then((res) => res);
};

const deleteById = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then((res) => res);
};

const update = (id, newName, newNumber) => {
  const req = axios.put(`${baseUrl}/${id}`, {
    id,
    name: newName,
    number: newNumber,
  });
  return req.then((res) => res);
};

const services = {
  getAll,
  add,
  deleteById,
  update,
};

export default services;
