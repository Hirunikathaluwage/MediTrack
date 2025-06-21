import React, { useState, useEffect } from "react";
import { Table, Button, Select, Space, Modal, message } from "antd";
import axios from "axios";

const { Option } = Select;

const ManageReservationsPage = () => {
    const [reservations, setReservations] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);

    // Fetch all reservations on mount
    useEffect(() => {
        fetchReservations();
    }, []);

    // Function to fetch all reservations from backend
    const fetchReservations = async () => {
        try {
            const response = await axios.get("http://localhost:5080/api/reserve");
            setReservations(response.data.reservations || []);
        } catch (error) {
            console.error("Failed to fetch reservations:", error);
            message.error("Failed to load reservations");
        }
    };


    const handleStatusChange = async (reservationId, newStatus) => {
        try {
            await axios.patch(`http://localhost:5080/api/reserve/${reservationId}`, { status: newStatus });


            setReservations(prevReservations =>
                prevReservations.map(reservation =>
                    reservation._id === reservationId
                        ? { ...reservation, status: newStatus }
                        : reservation
                )
            );

            message.success('Status updated successfully');
        } catch (error) {
            console.error('Error updating status:', error);
            message.error('Failed to update status');
        }
    };

    // Handle deleting reservation
    const handleDeleteReservation = (reservationId) => {
        axios
            .delete(`http://localhost:5080/api/reserve/${reservationId}`)
            .then(() => {
                const updatedReservations = reservations.filter(
                    (reservation) => reservation._id !== reservationId
                );
                setReservations(updatedReservations);
                message.success("Reservation deleted.");
            })
            .catch(() => message.error("Failed to delete reservation"));
    };

    // Show reservation details in modal
    const showReservationDetails = (reservation) => {
        setSelectedReservation(reservation);
        setIsModalVisible(true);
    };

    return (
        <div>
            <h2>Manage Reservations</h2>
            {/* Reservation Table */}
            <Table dataSource={reservations} rowKey="_id">
                <Table.Column title="Reservation ID" dataIndex="_id" key="_id" />
                <Table.Column
                    title="User ID"
                    dataIndex="userId"
                    key="userId"
                    render={(userId) => userId || "Unknown"}
                />
                <Table.Column
                    title="Medicine"
                    dataIndex="items"
                    key="items"
                    render={(items) => (
                        <ul>
                            {items.map((item, index) => (
                                <li key={index}>
                                    {item.medicineId?.name || "Unknown Medicine"} (x{item.quantity}- Status: {item.status})
                                </li>
                            ))}
                        </ul>
                    )}
                />
                <Table.Column
                    title="Status"
                    dataIndex="status"
                    key="status"
                    render={(status, record) => (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Select
                                defaultValue={status || "pending"}
                                onChange={(value) => handleStatusChange(record._id, value)}
                                style={{ width: 120 }}
                            >
                                <Option value="pending">Pending</Option>
                                <Option value="available">Available</Option>
                                <Option value="notified">Notified</Option>
                            </Select>
                        </div>
                    )}
                />
                <Table.Column
                    title="Actions"
                    key="actions"
                    render={(_, reservation) => (
                        <Space>
                            <Button onClick={() => showReservationDetails(reservation)}>View</Button>
                            <Button danger onClick={() => handleDeleteReservation(reservation._id)}>
                                Delete
                            </Button>
                        </Space>
                    )}
                />
            </Table>

            {/* Reservation Details Modal */}
            <Modal
                title="Reservation Details"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                {selectedReservation && (
                    <div>
                        <p><strong>Reservation ID:</strong> {selectedReservation._id}</p>
                        <p><strong>User ID:</strong> {selectedReservation.userId || "Unknown"}</p>
                        <p><strong>Status:</strong> {selectedReservation.status || "Pending"}</p>
                        <p><strong>Items:</strong></p>
                        <ul>
                            {selectedReservation.items.map((item, index) => (
                                <li key={index}>
                                    {item.medicineId?.name || "Unknown Medicine"} (x{item.quantity}) - Status: {item.status || "Pending"}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ManageReservationsPage;
