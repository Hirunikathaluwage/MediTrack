import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Display({ inquiries }) {
    if (!Array.isArray(inquiries) || inquiries.length === 0) {
        return <div>No inquiry data available</div>;
    }

    const history = useNavigate();

    const deleteHandler = async (id) => {
        await axios.delete(`http://localhost:5000/api/inquiries/${id}`)
            .then(() => history("/"))
            .then(() => history("/inquiries/"));
    };

    return (
        <div>
            {inquiries.map(inquire => (
                <div key={inquire._id}>
                    <h3>{inquire.name}</h3>
                    <p><strong>Email:</strong> {inquire.email}</p>
                    <p><strong>Subject:</strong> {inquire.subject}</p>
                    <p><strong>Description:</strong> {inquire.description}</p>
                    <p><strong>Category:</strong> {inquire.category}</p>
                    <p><strong>Priority:</strong> {inquire.priority}</p>
                    <p><strong>Created At:</strong> {new Date(inquire.createdAt).toLocaleString()}</p>

                    {inquire.attachment && (
                        <p>
                            <strong>Attachment:</strong>
                            <a href={inquire.attachment} target="_blank" rel="noopener noreferrer"> View File</a>
                        </p>
                    )}

                    <button onClick={() => deleteHandler(inquire._id)}>Delete Inquiry</button>
                    <button onClick={() => history(`/inquiries/edit/${inquire._id}`)}>Edit Inquiry</button>
                    <button onClick={() => history(`/inquiries/view/${inquire._id}`)}>View Inquiry</button>

                    <hr />
                </div>
            ))}
        </div>
    );
}

export default Display;
