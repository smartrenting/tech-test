import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../contexts/AppContext";
import { getOrdersByDate } from "./helper";

const OrdersByDate = () => {
  const { ordersState } = useAppContext();
  const { orders } = ordersState;
  const [pickedDate, setPickedDate] = useState(new Date().toLocaleDateString());
  const [ordersByDate, setOrdersByDate] = useState(orders);

  const handlePickedDate = (e) => {
    e.preventDefault();
    console.log(new Date(e.target.value));
    setPickedDate(new Date(e.target.value).toLocaleDateString());
  };

  useEffect(() => {
    const ordered = getOrdersByDate(orders, pickedDate);
    setOrdersByDate(ordered);
  }, [orders, pickedDate]);

  return (
    <div>
      <h2>Find orders by date</h2>
      <input
        type="date"
        value={pickedDate.split("/").reverse().join("-")}
        onChange={handlePickedDate}
      />
      <div>
        {ordersByDate.map((order) => (
          <div key={order.id}>
            {order.username} {order.quantity}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersByDate;
