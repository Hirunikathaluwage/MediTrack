import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Display.css'; // Import the CSS file

function Display({ inquiries }) {
    const navigate = useNavigate(); // Updated from history to navigate
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredInquiries, setFilteredInquiries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Initialize filtered inquiries when component mounts or inquiries change
    useEffect(() => {
        if (Array.isArray(inquiries)) {
            setFilteredInquiries(inquiries);
        }
    }, [inquiries]);

    const filterOptions = {
        "Technical Support": inquiry => inquiry.category === "Technical Support",
        "Delivery Issue": inquiry => inquiry.category === "Delivery Issue",
        "Billing": inquiry => inquiry.category === "Billing",
        "General": inquiry => inquiry.category === "General",
        "Payment Issue": inquiry => inquiry.category === "Payment Issue",
    };

    const handleSearch = () => {
        setIsLoading(true);
        setTimeout(() => {
            const filtered = inquiries.filter(inquiry => {
                const filterOption = filterOptions[searchTerm];
                if (filterOption) {
                    return filterOption(inquiry);
                } else {
                    return true;
                }
            });
            setFilteredInquiries(filtered);
            setIsLoading(false);
        }, 300); // Small timeout to show loading state
    };

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure you want to delete this inquiry?")) {
            setIsLoading(true);
            try {
                await axios.delete(`http://localhost:5000/api/inquiries/${id}`);
                // Use navigate instead of history
                navigate("/");
                navigate("/inquiries/");
            } catch (error) {
                console.error("Error deleting inquiry:", error);
                alert("Failed to delete inquiry. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const downloadReport = () => {
        // Format for CSV - escape commas and quotes in text fields
        const formatCSVField = (field) => {
            if (field === null || field === undefined) return '';
            const stringField = String(field);
            if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
                return `"${stringField.replace(/"/g, '""')}"`;
            }
            return stringField;
        };
        
        // Add headers to the CSV
        const headers = ['Name', 'Email', 'Subject', 'Description', 'Category', 'Priority', 'Created At', 'Attachment'];
        
        const reportData = filteredInquiries.map(inquiry => {
            return {
                name: formatCSVField(inquiry.name),
                email: formatCSVField(inquiry.email),
                subject: formatCSVField(inquiry.subject),
                description: formatCSVField(inquiry.description),
                category: formatCSVField(inquiry.category),
                priority: formatCSVField(inquiry.priority),
                createdAt: formatCSVField(new Date(inquiry.createdAt).toLocaleString()),
                attachment: formatCSVField(inquiry.attachment || 'None'),
            };
        });

        // Create CSV content with proper escaping
        const csvContent = [
            headers.join(','),
            ...reportData.map(row => Object.values(row).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `inquiry-report-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // Get category CSS class based on category value
    const getCategoryClass = (category) => {
        switch(category) {
            case 'Technical Support': return 'category-technical';
            case 'Delivery Issue': return 'category-delivery';
            case 'Billing': return 'category-billing';
            case 'General': return 'category-general';
            case 'Payment Issue': return 'category-payment';
            default: return '';
        }
    };

    // Get priority CSS class based on priority value
    const getPriorityClass = (priority) => {
        switch(priority?.toLowerCase()) {
            case 'high': return 'priority-high';
            case 'medium': return 'priority-medium';
            case 'low': return 'priority-low';
            default: return '';
        }
    };

    // Function to truncate text and add tooltip for long descriptions
    const truncateText = (text, maxLength = 50) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    if (!Array.isArray(inquiries) || inquiries.length === 0) {
        return (
            <div className="inquiry-display-container">
                <div className="inquiry-header">
                    <div>
                        <h2 className="inquiry-title">Customer Inquiries</h2>
                        <p className="inquiry-subtitle">Manage and track all customer inquiries</p>
                    </div>
                </div>
                <div className="no-data">No inquiry data available</div>
            </div>
        );
    }

    return (
        <div className="inquiry-display-container">
            <div className="inquiry-header">
                <div>
                    <h2 className="inquiry-title">Customer Inquiries</h2>
                    <p className="inquiry-subtitle">Manage and track all customer inquiries</p>
                </div>
            </div>

            <div className="inquiry-controls">
                <select 
                    className="inquiry-select"
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Delivery Issue">Delivery Issue</option>
                    <option value="Billing">Billing</option>
                    <option value="General">General</option>
                    <option value="Payment Issue">Payment Issue</option>
                </select>
                <button 
                    className="inquiry-button" 
                    onClick={handleSearch}
                    disabled={isLoading}
                >
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
                <button 
                    className="inquiry-button" 
                    onClick={downloadReport}
                    disabled={isLoading || filteredInquiries.length === 0}
                >
                    Download Report
                </button>
            </div>

            <div className="inquiry-table-wrapper">
                <table className="inquiry-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Subject</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Priority</th>
                            <th>Created At</th>
                            <th>Attachment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInquiries.map(inquiry => (
                            <tr key={inquiry._id} className={isLoading ? 'loading' : ''}>
                                <td>{inquiry.name}</td>
                                <td>{inquiry.email}</td>
                                <td>{truncateText(inquiry.subject)}</td>
                                <td title={inquiry.description}>{truncateText(inquiry.description, 100)}</td>
                                <td>
                                    <span className={`category-badge ${getCategoryClass(inquiry.category)}`}>
                                        {inquiry.category}
                                    </span>
                                </td>
                                <td>
                                    <span className={`priority-badge ${getPriorityClass(inquiry.priority)}`}>
                                        {inquiry.priority}
                                    </span>
                                </td>
                                <td>{new Date(inquiry.createdAt).toLocaleString()}</td>
                                <td>
                                    {inquiry.attachment && 
                                        <a 
                                            href={inquiry.attachment} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="file-link"
                                        >
                                            View
                                        </a>
                                    }
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button 
                                            className="inquiry-button delete" 
                                            onClick={() => deleteHandler(inquiry._id)}
                                            title="Delete"
                                        />
                                        <button 
                                            className="inquiry-button edit" 
                                            onClick={() => navigate(`/inquiries/edit/${inquiry._id}`)}
                                            title="Edit"
                                        />
                                        <button 
                                            className="inquiry-button view" 
                                            onClick={() => navigate(`/inquiries/view/${inquiry._id}`)}
                                            title="View"
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Display;