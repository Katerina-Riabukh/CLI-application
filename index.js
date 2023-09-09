const argv = require("yargs").argv;
const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactsList = await contacts.listContacts();
      return console.table(contactsList);
      break;

    case "get":
      const contactById = await contacts.getContactById(id);
      return console.log(contactById);
      break;

    case "add":
      const add = await contacts.addContact({ name, email, phone });
      return console.log(add);
      break;

    case "remove":
      const remove = await contacts.removeContact(id);
      return console.log(remove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
