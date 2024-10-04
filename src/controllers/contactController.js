// controllers/contactController.js
import Contact from '../models/contactModel.js';

export const handleContactForm = async (req, res) => {
  const { name, companyName, email, message } = req.body;

  // Validate input
  if (!name || !companyName || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Create a new contact document
    const newContact = new Contact({name,companyName,email,message});

    // Save the contact document to the database
    await newContact.save();

    // Send a success response
    res.status(201).json({ success: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//Get all contacts
export const getContacts = async (req, res) => {
  try{
    const contacts = await Contact.find();
    res.json(contacts);
  } catch(error){
    res.status(500).json({error: 'Failed to retrieve contacts'});
  }
};

//Get a single contacts
export const getContactById = async (req, res) => {
  const { id } = req.params;
  try{
    const contact = await Contact.findById(id);
    if(!contact){
      return res.status(404).json({error: 'Contact not found'});
    }
    return res.status(200).json(contact);
  } catch(error){
    console.error('Error fetching map:', error);
    res.status(500).json({error: 'Failed to retrieve contact'});
  }
};

export const deleteContact = async(req, res) => {
  const {id} = req.params;
  try{
    const deletedContact = await Contact.findByIdAndDelete(id);
    if(!deleteContact) return res.status(404).json({error: 'Contact not found'});
    res.json({message: 'Contact deleted successfully'});
  }  catch(error){
    res.status(500).json({error: 'Failed to delete contact'});
  }
};


