import React, { useState } from "react";
import { Table, Tag, Button, Image, message } from "antd";

const dummyPayments = [
    {
        _id: "1",
        user: { name: "Kasun Perera" },
        amount: 1500,
        paymentMethod: "slip",
        slipImage: "https://via.placeholder.com/100", // Use actual image URL in real case
        verificationStatus: "pending",
    },
    {
        _id: "2",
        user: { name: "Nimali Silva" },
        amount: 2200,
        paymentMethod: "slip",
        slipImage: "https://via.placeholder.com/100",
        verificationStatus: "pending",
    },
];

export default function VerifyPaymentsPage() {
    const [payments, setPayments] = useState(dummyPayments);

    const handleApprove = (paymentId) => {
        const updatedPayments = payments.map((payment) =>
            payment._id === paymentId ? { ...payment, verificationStatus: "approved" } : payment
        );
        setPayments(updatedPayments);
        message.success("Payment approved.");
    };

    const handleReject = (paymentId) => {
        const updatedPayments = payments.map((payment) =>
            payment._id === paymentId ? { ...payment, verificationStatus: "rejected" } : payment
        );
        setPayments(updatedPayments);
        message.success("Payment rejected.");
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Verify Uploaded Payment Slips</h2>

            <Table dataSource={payments} rowKey="_id" pagination={{ pageSize: 5 }}>
                <Table.Column title="User" dataIndex="user" key="user" render={(user) => user?.name} />
                <Table.Column title="Amount" dataIndex="amount" key="amount" render={(amount) => `Rs. ${amount}`} />
                <Table.Column title="Method" dataIndex="paymentMethod" key="paymentMethod" />
                <Table.Column
                    title="Slip Image"
                    dataIndex="slipImage"
                    key="slipImage"
                    render={(src) => <Image width={100} src={src} alt="Payment Slip" />}
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
