import React from "react";
import { useAppContext } from "../../contexts/AppContext";
import OrderItem from "./OrderItem";

const OrderList = ({ authStr }: { authStr: string }) => {
  const { ordersState } = useAppContext();
  const { orders } = ordersState;

  return (
    <div className="orderListContainer">
      <h2>Orders</h2>
      <div className="orderListHeader">
        <div className="username">username</div>
        <div className="quantity">quantity</div>
        <div className="date">date</div>
        <div className="spacer"></div>
      </div>
      <div className="orderList">
        {orders.map((order) => (
          <OrderItem order={order} authStr={authStr} key={order.id} />
        ))}
      </div>
    </div>
  );
};

export default OrderList;
