import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Team = () => {
    const [team, setTeam] = useState([]);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await axios.get(`http://localhost:1111/api/v1/restourant_team/team`);
                setTeam(response.data.team);
            } catch (error) {
                console.error('Error fetching team data:', error);
            }
        };

        fetchTeam();
    }, []);

    return (
        <section className='team' id='team'>
            <div className="container">
                <div className="heading_section">
                    <h1 className='heading'>OUR TEAM</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
                </div>
                <div className="team_container">
                    {team.map(member => {
                        console.log('Image URL:', member.image);
                        return (
                            <div className='card' key={member._id}>
                                <img src={member.image} alt={member.name} onError={(e) => e.target.src = 'default-image-url.jpg'} />
                                <h2>{member.name}</h2>
                                <p>{member.designation}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Team;
