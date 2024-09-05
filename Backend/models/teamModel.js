import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: '' // Make image optional with a default value
    }
});

const Team = mongoose.model('Team', teamSchema);

export default Team;
