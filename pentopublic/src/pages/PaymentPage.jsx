// src/pages/PaymentPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createRazorpayOrder, confirmPayment } from "../services/razorpayService";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPlan, userId } = location.state || {};
  const [loading, setLoading] = useState(false);

  const getAmount = () => {
    if (selectedPlan === "monthly") return 200;
    if (selectedPlan === "yearly") return 900;
    return 0;
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      const amount = getAmount();
      const orderData = await createRazorpayOrder(amount * 100); // Convert to paisa

      const options = {
        key: "rzp_test_WRsSYZ0lzH0eE9", // Replace with your Razorpay Key
        amount: orderData.amount,
        currency: "INR",
        name: "PenToPublic",
        description: "Subscription Payment",
        order_id: orderData.orderId,
        handler: async function (response) {
          const payload = {
            razorpayPaymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            userId,
            amount,
            endDate: selectedPlan === "monthly"
              ? new Date(new Date().setMonth(new Date().getMonth() + 1))
              : new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
            paymentMode: "Razorpay",
          };

          const confirmation = await confirmPayment(payload.razorpayPaymentId, payload.orderId, userId);
          alert("Payment successful!");
          navigate("/dashboard");
        },
        prefill: {
          name: "Your Name",
          email: "user@example.com",
        },
        theme: {
          color: "#f59e0b",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Something went wrong during payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Confirm Your {selectedPlan?.toUpperCase()} Subscription</h2>
        <p className="text-gray-600 mb-6">Plan: <strong>{selectedPlan}</strong></p>
        <p className="text-xl font-semibold mb-8">Amount: ₹{getAmount()}</p>
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold shadow-lg hover:from-amber-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200"
        >
          {loading ? "Processing..." : "Pay & Subscribe"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
