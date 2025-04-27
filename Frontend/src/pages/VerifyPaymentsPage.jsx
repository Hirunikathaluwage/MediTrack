import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Image, message } from "antd";
import axios from "axios";

export default function VerifyPaymentsPage() {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const res = await axios.get("http://localhost:5080/api/payments/slips");
            setPayments(res.data);

        } catch (error) {
            console.error(error);
            message.error("Failed to load payments.");
        }
    };

    const handleApprove = async (paymentId) => {
        try {
            await axios.put(`http://localhost:5080/api/payments/update-status/${paymentId}`, {
                status: "approved",
            });
            message.success("Payment approved.");

            // Refresh list
            const res = await axios.get("http://localhost:5080/api/payments/slips");
            setPayments(res.data);
        } catch (error) {
            console.error(error);
            message.error("Failed to approve payment.");
        }
    };

    const handleReject = async (paymentId) => {
        try {
            await axios.put(`http://localhost:5080/api/payments/update-status/${paymentId}`, {
                status: "rejected",
            });
            message.success("Payment rejected.");

            // Refresh list
            const res = await axios.get("http://localhost:5080/api/payments/slips");
            setPayments(res.data);
        } catch (error) {
            console.error(error);
            message.error("Failed to reject payment.");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Verify Uploaded Payment Slips</h2>

            <Table dataSource={payments} rowKey="_id" pagination={{ pageSize: 5 }}>
                <Table.Column title="User" dataIndex="userId" key="user" render={(user) => user?.name} />
                <Table.Column title="Amount" dataIndex="amount" key="amount" render={(amount) => `Rs. ${amount}`} />
                <Table.Column title="Method" dataIndex="paymentMethod" key="paymentMethod" />
                <Table.Column
                    title="Slip Image"
                    dataIndex="slipImage"
                    key="slipImage"
                    render={(filename) => (
                        <Image
                            width={100}
                            src={`http://localhost:5080/uploads/slips/${filename}`}
                            alt="Payment Slip"
                        />
                    )}
                />

                <Table.Column
                    title="Verification"
                    dataIndex="verificationStatus"
                    key="verificationStatus"
                    render={(status) => (
                        <Tag color={status === "approved" ? "green" : status === "rejected" ? "red" : "orange"}>
                            {status}
                        </Tag>
                    )}
                />
                <Table.Column
                    title="Actions"
                    key="actions"
                    render={(text, record) => (
                        <div className="flex gap-2">
                            <Button type="primary" onClick={() => handleApprove(record._id)}>
                                Approve
                            </Button>
                            <Button danger onClick={() => handleReject(record._id)}>
                                Reject
                            </Button>
                        </div>
                    )}
                />
            </Table>
        </div>
    );
}
