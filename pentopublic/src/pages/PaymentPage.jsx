// src/pages/PaymentPage.jsx

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const amount = new URLSearchParams(location.search).get("amount");

  const [paymentMode, setPaymentMode] = useState("card");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });

  const handlePayment = () => {
    // Simulate payment
    setTimeout(() => {
      navigate(`/register?subscribed=true`);
    }, 1000);
  };

  return (
    <div className="max-w-lg mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Payment - ₹{amount}</h1>

      <label className="block mb-2">Payment Mode:</label>
      <select
        value={paymentMode}
        onChange={(e) => setPaymentMode(e.target.value)}
        className="w-full mb-4 border p-2 rounded"
      >
        <option value="card">Card</option>
        <option value="upi">UPI</option>
        <option value="netbanking">Net Banking</option>
      </select>

      {paymentMode === "card" && (
        <div className="grid gap-3 mb-4">
          <Input
            placeholder="Card Number"
            value={card.number}
            onChange={(e) => setCard({ ...card, number: e.target.value })}
          />
          <Input
            placeholder="Expiry (MM/YY)"
            value={card.expiry}
            onChange={(e) => setCard({ ...card, expiry: e.target.value })}
          />
          <Input
            placeholder="CVV"
            value={card.cvv}
            onChange={(e) => setCard({ ...card, cvv: e.target.value })}
          />
        </div>
      )}

      <Button onClick={handlePayment} className="w-full">
        Pay & Continue
      </Button>
    </div>
  );
};

export default PaymentPage;
