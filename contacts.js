const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {}
};

const getContactById = async (contactId) => {
  try {
    const list = await listContacts();

    const result = list.find((i) => i.id === contactId);
    return result || null;
  } catch (error) {}
};

const removeContact = async (contactId) => {
  try {
    const list = await listContacts();
    const result = list.filter((contact) => contact.id === contactId);
    return result;
  } catch (error) {}
};

const addContact = async (data) => {
  try {
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
  } catch (error) {}
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
