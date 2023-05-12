import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useParams, useNavigate } from "react-router-dom";

import "./Payment.css";

const initialOptions = {
  "client-id":
    "AW0x0Fy-Ot0n7v5url4XevEW9cauIR6zrj9aRzXminakFxxxrP4tAIGTAaejXuMJRAYOxFVbny8RLMes",
  currency: "ILS",
};

const Payment = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const value = params.value;
  console.log("a1a1a1a1 ", value);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: value,
          },
        },
      ],
    });
  };

  return (
    <div className="container">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          createOrder={createOrder}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              const name = details.payer.name.given_name;
              alert(`Transaction completed by ${name}`);
              fetch(`/api/admin//payment`, {
                method: "post",
                body: JSON.stringify({
                  numTable: 1, //קוקיס
                  value: value,
                }),
                headers: { "Content-Type": "application/json" },
              })
                .then()
                .catch();
              navigate(`/table/{1}`); // לשנות למספר שולחן לפי הקוקיס
            });
          }}
        />
      </PayPalScriptProvider>
      <button
        onClick={() => {
          fetch(`/api/admin//payment`, {
            method: "post",
            body: JSON.stringify({
              numTable: 1, //קוקיס
              value: 5,
            }),
            headers: { "Content-Type": "application/json" },
          })
            .then()
            .catch();
          navigate(`/table/1`);
        }} // לשנות למספר שולחן לפי הקוקיס}}
      ></button>
    </div>
  );
};

export default Payment;
