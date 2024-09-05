import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';
import toast from 'react-hot-toast';

const ManageReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:1111/api/v1/reservation/all');
                setReservations(response.data.data);
            } catch (error) {
                toast.error('Error fetching reservations');
            }
        };

        fetchReservations();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:1111/api/v1/reservation/${id}`);
            setReservations(reservations.filter(reservation => reservation._id !== id));
            toast.success('Reservation deleted successfully!');
        } catch (error) {
            toast.error('Error deleting reservation');
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1); // Reset to first page on items per page change
    };

    const filteredReservations = reservations.filter(reservation => {
        return (
            reservation.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            reservation.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            reservation.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            reservation.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
            reservation.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
            reservation.time.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedReservations = filteredReservations.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <AdminDashboard>
            <div className="manage-reservations-container">
                <h2>Manage Reservations</h2>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-bar"
                />
                <div className="items-per-page">
                    <label htmlFor="itemsPerPage">Items per page:</label>
                    <select
                        id="itemsPerPage"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="items-per-page-select"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <table className="manage-reservations-table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedReservations.length > 0 ? (
                            paginatedReservations.map(reservation => (
                                <tr key={reservation._id}>
                                    <td>{reservation.firstname}</td>
                                    <td>{reservation.lastname}</td>
                                    <td>{reservation.email}</td>
                                    <td>{reservation.phone}</td>
                                    <td>{reservation.date}</td>
                                    <td>{reservation.time}</td>
                                    <td>
                                        <button className="button button-delete" onClick={() => handleDelete(reservation._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No reservations found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="pagination">
                    <button
                        className="pagination-button"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className="pagination-button"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </AdminDashboard>
    );
};

export default ManageReservations;
