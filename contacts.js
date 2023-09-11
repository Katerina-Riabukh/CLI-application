const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const list = await listContacts();

  const result = list.find((i) => i.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const list = await listContacts();
  const result = list.filter((contact) => contact.id === contactId);
  return result;
};

const addContact = async (data) => {
  const newContact = {
    ...data,
    id: nanoid(),
  };
  const list = await listContacts();
  list.push(newContact);
  const addContact = await fs.writeFile(
    contactsPath,
    JSON.stringify(list, null, 3)
  );
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
