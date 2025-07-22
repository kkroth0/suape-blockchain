import { Router } from 'express';
import { createEvent, getEvents } from '../controllers/eventController';

const router = Router();

router.post('/', createEvent);
router.get('/', getEvents);

export default router; 