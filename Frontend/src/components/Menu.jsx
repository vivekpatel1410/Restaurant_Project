import React, { useEffect, useState } from "react";
import { data } from "../restApi.json";
import axios from "axios";

const Menu = () => {

    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get(`http://localhost:1111/api/v1/menu/menuget`);
                setMenu(response.data.menu);
            } catch (error) {
                console.error('Error fetching team data:', error);
            }
        };
        fetchMenu();
    }, []);

    return (
        <section className="menu" id="menu">
            <div className="container">
                <div className="heading_section">
                    <h1 className="heading">POPULAR DISHES</h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga, iusto dolorem! Voluptatibus ipsum nam mollitia architecto. Soluta pariatur eius et recusandae veritatis. Quasi, et molestias!</p>
                </div>
                <div className="dishes_container">
                    {
                        menu.map(element => {
                            console.log('Image URL:', element.image);
                            return (
                                <div className="card" key={element.id}>
                                    <img src={element.image} alt={element.title} />
                                    <h3>{element.title}</h3>
                                    <button className="cardbtn">{element.category}</button>
                                </div>
                            )
                        })
                    }



                </div>
            </div>
        </section>
    )
}

export default Menu