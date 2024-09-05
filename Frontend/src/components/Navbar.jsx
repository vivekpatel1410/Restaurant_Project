import React, { useState } from "react";
import { data } from "../restApi.json";
import { Link } from "react-scroll";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from '../contexts/AuthContext'; 
import { useNavigate } from 'react-router-dom'; 

const Navbar = () => {
    const [show, setShow] = useState(false);
    const { logout } = useAuth(); 
    const navigate = useNavigate(); 

    const handleLogout = () => {
        logout(); 
        navigate('/login'); 
    };

    return (
        <>
            <nav>
                <div className="logo"><img src="public/logores.webp"/><span>ZEESH</span></div>
                <div className={show ? "navLinks showmenu" : "navLinks"}>
                    <div className="links">
                        {data[0].navbarLinks.map((element) => (
                            <Link
                                to={element.link}
                                spy={true}
                                smooth={true}
                                duration={500}
                                key={element.id}
                            >
                                {element.title}
                            </Link>
                        ))}
                    </div>
                    <button className="menuBtn">OUR MENU</button>
                    <button className="logoutBtn" onClick={handleLogout}>Logout</button> 
                </div>

                <div className="hamburger" onClick={() => setShow(!show)}>
                    <GiHamburgerMenu />
                </div>
            </nav>
        </>
    );
};

export default Navbar;
