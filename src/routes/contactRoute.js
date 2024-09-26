// routes/contactRoutes.js
import { Router } from 'express';
import { handleContactForm, getContacts, getContactById, deleteContact } from '../controllers/contactController.js';

const router = Router();

router.post('/', handleContactForm);
router.get('/', getContacts); // Get all maps
router.get('/:id', getContactById); 
router.get('/:id', deleteContact);

export default router;
