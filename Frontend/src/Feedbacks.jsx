import React, { useState, useEffect } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import axios from "axios";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch feedback data from the backend
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/feedbacks");
        setFeedbacks(
          response.data.map((feedback, index) => ({
            key: feedback._id, // Unique identifier for each row
            deliveryId: `DEL00${index + 1}`, // Generate a sample delivery ID
            deliveryRate: feedback.deliveryRating,
            driverRate: feedback.driverRating,
            feedbackMessage: feedback.feedback,
          }))
        );
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        message.error("Failed to load feedbacks.");
      }
    };

    fetchFeedbacks();
  }, []);

  // Handle delete feedback
  const handleDelete = async (key) => {
    try {
      await axios.delete(`http://localhost:5000/api/feedbacks/${key}`);
      setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback.key !== key));
      message.success("Feedback deleted successfully.");
    } catch (error) {
      console.error("Error deleting feedback:", error);
      message.error("Failed to delete feedback.");
    }
  };

  // Define table columns
  const columns = [
    {
      title: "Delivery ID",
      dataIndex: "deliveryId",
      key: "deliveryId",
    },
    {
      title: "Delivery Rate",
      dataIndex: "deliveryRate",
      key: "deliveryRate",
    },
    {
      title: "Driver Rate",
      dataIndex: "driverRate",
      key: "driverRate",
    },
    {
      title: "Feedback Message",
      dataIndex: "feedbackMessage",
      key: "feedbackMessage",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this feedback?"
          onConfirm={() => handleDelete(record.key)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px", textAlign: "center" }}>
        Feedbacks
      </h1>
      <Table
        columns={columns}
        dataSource={feedbacks}
        bordered
        pagination={{ pageSize: 5 }}
        style={{ backgroundColor: "#fff" }}
      />
    </div>
  );
};

export default Feedbacks;
