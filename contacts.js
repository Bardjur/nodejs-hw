const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const res = data.find((item) => item.id === contactId);
  return res || null;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const idx = data.findIndex((item) => item.id === contactId);

  if (idx === -1) {
    return null;
  }

  const [removedContact] = data.splice(idx, 1);
  fs.writeFile(contactsPath, JSON.stringify(data, "", 2));
  return removedContact;
}

async function addContact(name, email, phone) {
  const data = await listContacts();
  const contact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(data, "", 2));
  return contact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
