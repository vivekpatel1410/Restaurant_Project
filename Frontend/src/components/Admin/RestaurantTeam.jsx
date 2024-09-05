import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminDashboard from './AdminDashboard';

const RestaurantTeam = () => {
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [image, setImage] = useState(null);
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState('');

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await axios.get('http://localhost:1111/api/v1/restourant_team/team');
                setTeam(response.data.team);
            } catch (error) {
                console.error('Error fetching team data:', error);
                setError('Failed to fetch team data');
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:1111/api/v1/restourant_team/team/${id}`);
            toast.success('Team member deleted successfully');
            const response = await axios.get('http://localhost:1111/api/v1/restourant_team/team');
            setTeam(response.data.team);
        } catch (error) {
            console.error('Error deleting team member:', error);
            toast.error('Failed to delete team member');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting:', { name, designation, image });

        const formData = new FormData();
        formData.append('name', name);
        formData.append('designation', designation);
        if (image) formData.append('image', image);

        try {
            if (editMode) {
                await axios.put(`http://localhost:1111/api/v1/restourant_team/team/${editId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                toast.success('Team member updated successfully');
            } else {
                await axios.post('http://localhost:1111/api/v1/restourant_team/teamsend', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                toast.success('Team member added successfully');
            }
            const response = await axios.get('http://localhost:1111/api/v1/restourant_team/team');
            setTeam(response.data.team);
            resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(editMode ? 'Failed to update team member' : 'Failed to add team member');
        }
    };

    const handleEdit = (member) => {
        setName(member.name);
        setDesignation(member.designation);
        setImage(member.image);
        setEditId(member._id);
        setEditMode(true);
    };

    const resetForm = () => {
        setName('');
        setDesignation('');
        setImage(null);
        setEditMode(false);
        setEditId('');
    };

    return (
        <AdminDashboard>
            <div>
                <section className='add-team'>
                    <div className="container">
                        <h1>{editMode ? 'Edit Team Member' : 'Add Team Member'}</h1>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Designation:
                                <input
                                    type="text"
                                    value={designation}
                                    onChange={(e) => setDesignation(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Image:
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0] || null)} 
                                    required
                                />
                            </label>
                            <button type="submit">{editMode ? 'Update Team Member' : 'Add Team Member'}</button>
                            {editMode && <button className='cancelbtn' type="button" onClick={resetForm}>Cancel</button>}
                        </form>
                    </div>
                </section>

                <section className='team' id='team'>
                    <div className="container">
                        <div className="heading_section">
                            <h1 className='heading'>OUR TEAM</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
                        </div>
                       
                            <div className="team_container">
                                {team.map(member => (
                                    <div className='card' key={member._id}>
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            onError={(e) => e.target.src = 'default-image-url.jpg'}
                                        />
                                        <h2>{member.name}</h2>
                                        <p>{member.designation}</p>
                                        <button className="button-edit" onClick={() => handleEdit(member)}>Edit</button>
                                        <button onClick={() => handleDelete(member._id)}>Delete</button>
                                    </div>
                                ))}
                            </div>
                      
                    </div>
                </section>
            </div>
        </AdminDashboard>
    );
};

export default RestaurantTeam;
