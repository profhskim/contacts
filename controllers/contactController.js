const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

// @desc Get all contacts
// @route GET /contacts
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  const users = [
    { name: 'John', email: 'john@aaa.bbb', phone: '123456789' },
    { name: 'Jane', email: 'jane@aaa.bbb', phone: '678912345' },
  ];
  res.render('index', { contacts: contacts });
});

// @desc View add contact form
// @route GET /contacts/add
const addContactForm = (req, res) => {
  res.render('add');
};

// @desc Create a contact
// @route POST /contacts
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).send('필수값이 입력되지 않았습니다.');
  } else {
    const contact = await Contact.create({
      name,
      email,
      phone,
    });
    res.redirect('/contacts');
  }
});

// @desc Get contact
// @route GET /contacts/:id
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render('update', { contact: contact });
});

// @desc Update contact
// @route PUT /contacts/:id
const updateContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name, email, phone } = req.body;

  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { name, email, phone },
    { new: true }
  );
  res.redirect('/contacts');
});

// @desc Delete contact
// @route DELETE /contacts/:id
const deleteContact = asyncHandler(async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect('/contacts');
});

module.exports = {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
  addContactForm,
};
