import React, { useState, useEffect } from "react";
import { Card, Rate, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { createDeliveryFeedback, getDeliveryPersonById } from "./services/deliveryService";

const DeliveryRate = () => {
  const [deliveryRating, setDeliveryRating] = useState(0);
  const [driverRating, setDriverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [driver, setDriver] = useState(null); // State to store driver data
  const navigate = useNavigate();

  // Fetch driver information (replace "driverIdHere" with the actual driver ID)
  // useEffect(() => {
  //   const fetchDriver = async () => {
  //     try {
  //       const response = await getDeliveryPersonById("driverIdHere"); // Replace with actual driver ID
  //       setDriver(response.data);
  //     } catch (error) {
  //       console.error("Error fetching driver details:", error);
  //       message.error("Failed to fetch driver details.");
  //     }
  //   };

  //   fetchDriver();
  // }, []);

  const handleSubmit = async () => {
    // if (!driver) {
    //   message.error("Driver details are not available. Please try again later.");
    //   return;
    // }

    if (deliveryRating === 0 || driverRating === 0) {
      message.error("Please provide both delivery and driver ratings before submitting!");
      return;
    }

    const feedbackData = {
      deliveryRating,
      driverRating,
      feedback,
      //driverId: driver._id, // Use the driver's ObjectId dynamically
    };

    try {
      const response = await createDeliveryFeedback(feedbackData);
      message.success(response.data.message);
      navigate("/thankyou");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      const errorMessage = error.response?.data?.message || "Failed to submit feedback. Please try again later.";
      message.error(errorMessage);
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh", textAlign: "center" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>How was your delivery?</h1>

      {/* Delivery Rating Section */}
      <Rate
        style={{ fontSize: "30px", marginBottom: "20px" }}
        value={deliveryRating}
        onChange={(value) => setDeliveryRating(value)}
      />

      {/* Feedback Section */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
        <Card style={{ flex: 1, padding: "20px", backgroundColor: "#eaeaea", borderRadius: "10px", maxWidth: "300px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>Rate Driver</h2>
          <Rate
            style={{ fontSize: "30px", marginBottom: "10px" }}
            value={driverRating}
            onChange={(value) => setDriverRating(value)}
          />
          {driver ? (
            <>
              <p style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "5px" }}>{driver.name}</p>
              <p style={{ fontSize: "14px", color: "#555" }}>{driver.vehicleType}</p>
            </>
          ) : (
            <p>Loading driver details...</p>
          )}
        </Card>

        <Card style={{ flex: 2, padding: "20px", backgroundColor: "#eaeaea", borderRadius: "10px", maxWidth: "600px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>Give us Feedback</h2>
          <Input.TextArea
            rows={4}
            placeholder="Write your feedback here.  (Optional)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </Card>
      </div>

      {/* Submit Button */}
      <Button type="primary" size="large" onClick={handleSubmit} style={{ marginTop: "20px" }}>
        Submit Feedback
      </Button>
    </div>
  );
};

export default DeliveryRate;