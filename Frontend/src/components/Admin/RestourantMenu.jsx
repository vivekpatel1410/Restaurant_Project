import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminDashboard from './AdminDashboard';

const RestaurantMenu = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(''); 

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get('http://localhost:1111/api/v1/menu/menuget');
                setMenu(response.data.menu);
            } catch (error) {
                console.error('Error fetching menu data:', error);
                setError('Failed to fetch menu data');
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editMode) {
                await axios.put(`http://localhost:1111/api/v1/menu/menu/${editId}`, {
                    title,
                    category,
                    image
                });
    
                toast.success("Menu Updated Successfully!");
            }
            else {
            await axios.post("http://localhost:1111/api/v1/menu/sends", {
                title,
                category,
                image
            });

            toast.success("Menu Added Successfully!");
        }
            const response = await axios.get('http://localhost:1111/api/v1/menu/menuget');
            setMenu(response.data.menu);
        } catch (error) {
            toast.error("Failed to Add Menu!");
        }
        setTitle('');
        setCategory('');
        setImage('');
    };

    const Deletehandle = async (id) => {
        try {
            await axios.delete(`http://localhost:1111/api/v1/menu/menudel/${id}`);
            toast.success("Menu Deleted Successfully!");

            const response = await axios.get('http://localhost:1111/api/v1/menu/menuget');
            setMenu(response.data.menu);
        } catch (error) {
            console.error('Error deleting menu item:', error);
            toast.error('Failed to delete menu item');
        }
    };

    const Edithandle = (element) => {
        setTitle(element.title);
        setCategory(element.category);
        setImage(element.image);
        setEditId(element._id);
        setEditMode(true);
    }

    const resetForm = () => {
        setTitle('');
        setCategory('');
        setImage('');
        setEditId('');
        setEditMode(false);
    }

    if (loading) {
        return <p>Loading...</p>; 
    }

    return (
        <AdminDashboard>
            <section className='add-menu'>
                <div className="container-menu">
                    <h1>{editMode ? 'Edit Restaurant Menu' : "Add Restaurant Menu"}</h1>
                    {error && <p className="error">{error}</p>} 
                    <form onSubmit={handleSubmit}> 
                        <label>
                            Title:
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Category:
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Image URL:
                            <input
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">{editMode ? "Update Restaurant Menu" : "Add Restaurant Menu"}</button>
                        {editMode && <button className='cancelbtn' type="button" onClick={resetForm}>Cancel</button>}
                    </form>
                </div>
            </section>
            <section className="menu" id="menu">
                <div className="container">
                    <div className="heading_section">
                        <h1 className="heading">POPULAR DISHES</h1>
                    </div>
                    <div className="dishes_container">
                        {
                            menu.map(element => (
                                <div className="card" key={element.id}>
                                    <img src={element.image} alt={element.title} />
                                    <h3>{element.title}</h3>
                                   
                                    <button className='cardbtn'>{element.category}</button>
                                    <button className='deledit' onClick={() => Edithandle(element)}>Edit</button>
                                    <button className='delBtn' onClick={() => Deletehandle(element._id)}>Delete</button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </AdminDashboard>
    );
};

export default RestaurantMenu;
