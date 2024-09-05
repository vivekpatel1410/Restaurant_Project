import Team from '../models/teamModel.js';

// Team data delete
export const deleteTeamMember = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Team.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Team member not found' });
        }
        res.status(200).json({ success: true, message: 'Team member deleted successfully' });
    } catch (error) {
        console.error('Error deleting team member:', error);
        res.status(500).json({ success: false, message: 'Failed to delete team member' });
    }
};


//Create Team Member
export const createTeamMember = async (req, res) => {
    const { name, designation } = req.body;
    const image = req.file ? req.file.path.replace('uploads/', '') : ''; 

    try {``
        const newTeamMember = new Team({
            name,
            designation,
            image
        });

        await newTeamMember.save();

        res.status(201).json({ success: true, message: 'Team member added successfully!' });
    } catch (error) {
        console.error('Error adding team member:', error);
        res.status(500).json({ success: false, message: 'Failed to add team member' });
    }
};


// Get all team members
export const getAllTeamMembers = async (req, res) => {
    try {
        const teamMembers = await Team.find();
        res.status(200).json({ team: teamMembers });
    } catch (error) {
        console.error('Error fetching team members:', error);
        res.status(500).json({ message: 'Failed to fetch team members' });
    }
};

//Update All Team Member
export const updateTeamMember = async (req, res) => {
    const { id } = req.params;
    const { name, designation } = req.body;
    const image = req.file ? req.file.path.replace('uploads/', '') : ''; 

    try {
        const updatedMember = await Team.findByIdAndUpdate(
            id,
            { name, designation, image },
            { new: true }
        );

        if (!updatedMember) {
            return res.status(404).json({ message: 'Team member not found' });
        }

        res.status(200).json({ success: true, message: 'Team member updated successfully', team: updatedMember });
    } catch (error) {
        console.error('Error updating team member:', error);
        res.status(500).json({ success: false, message: 'Failed to update team member' });
    }
};