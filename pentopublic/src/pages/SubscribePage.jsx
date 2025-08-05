// // src/components/Payment/SubscriptionPage.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   createRazorpayOrder,
//   confirmPayment,
//   subscribeUser,
// } from "../services/razorpayService";
// import { useAuth } from "../context/AuthContext"; // make sure this file exists

// const SubscriptionPage = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth(); // user.id should exist
//   const [loading, setLoading] = useState(false);

//   const handleSubscription = async (type) => {
//     try {
//       setLoading(true);

//       // 1. Create Razorpay Order
//       const order = await createRazorpayOrder(user.id, type);

//       // 2. Open Razorpay
//       const options = {
//         key: "rzp_test_YourKey", // replace with live key in production
//         amount: order.amount,
//         currency: order.currency,
//         name: "PenToPublic",
//         description: `Subscription (${type})`,
//         order_id: order.id,
//         handler: async (response) => {
//           try {
//             // 3. Confirm payment
//             await confirmPayment(
//               response.razorpay_payment_id,
//               response.razorpay_order_id,
//               user.id
//             );

//             // 4. Subscribe user
//             await subscribeUser(user.id, type);

//             alert("Payment successful and subscription activated!");
//             navigate("/dashboard");
//           } catch (error) {
//             console.error("Payment confirmation failed", error);
//             alert("Payment confirmed but failed to activate subscription.");
//           }
//         },
//         prefill: {
//           name: user.username,
//           email: user.email,
//         },
//         theme: {
//           color: "#000000",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Order creation failed", error);
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-[#fdf4e4] p-4">
//       <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md text-center">
//         <h2 className="text-2xl font-serif mb-6">Choose a Subscription</h2>

//         <div className="space-y-4">
//           <button
//             onClick={() => handleSubscription("monthly")}
//             className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800"
//             disabled={loading}
//           >
//             {loading ? "Processing..." : "Subscribe Monthly ₹200"}
//           </button>

//           <button
//             onClick={() => handleSubscription("yearly")}
//             className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800"
//             disabled={loading}
//           >
//             {loading ? "Processing..." : "Subscribe Yearly ₹1000"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubscriptionPage;
// src/pages/SubscribePage.jsx

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SubscribePage = () => {
  const navigate = useNavigate();

  const handlePlanClick = (amount) => {
    navigate(`/payment?amount=${amount}`);
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Choose a Plan</h1>

      <div className="grid gap-6">
        <div className="border p-4 rounded shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Monthly - ₹99</h2>
          <p className="text-sm text-gray-600 mb-4">Access for 1 month</p>
          <Button onClick={() => handlePlanClick(99)}>Subscribe</Button>
        </div>

        <div className="border p-4 rounded shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Yearly - ₹999</h2>
          <p className="text-sm text-gray-600 mb-4">Access for 12 months</p>
          <Button onClick={() => handlePlanClick(999)}>Subscribe</Button>
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;

