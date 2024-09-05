import express from 'express';
import upload from '../Database/multerConfig.js';
import { deleteTeamMember, createTeamMember, getAllTeamMembers, updateTeamMember } from '../controller/teamController.js';

const router = express.Router();

router.post('/teamsend', upload.single('image'), createTeamMember);
router.get('/team', getAllTeamMembers);
router.delete('/team/:id', deleteTeamMember);
router.put('/team/:id', upload.single('image'), updateTeamMember);

export default router;
