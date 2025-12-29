import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ onError, onSuccess, amount }) => {
  return (
    <PayPalButtons
      style={{ layout: "vertical" }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value:
                  typeof amount === "number"
                    ? amount.toFixed(2)
                    : String(amount),
              },
            },
          ],
        });
      }}
      onApprove={(data, actions) => {
        return actions.order
          .capture()
          .then((details) => {
            if (onSuccess) onSuccess(details);
          })
          .catch((err) => {
            if (onError) onError(err);
          });
      }}
      onError={onError}
    />
  );
};

export default PayPalButton;
