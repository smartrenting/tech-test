import { AxiosResponse } from "axios";
import React, { useState } from "react";
import axios from "../../config/axios";
import { useAppContext } from "../../contexts/AppContext";
import { Order } from "../../models/Order";

const OrderItem = ({ order, authStr }: { order: Order; authStr: string }) => {
  const { user, ordersState, setOrdersState } = useAppContext();
  const { orders } = ordersState;
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedQuantity, setUpdatedQuantity] = useState<number>(
    order.quantity
  );

  const handleOrderDelete = async (e, id) => {
    e.preventDefault();
    await axios.delete(`/orders/delete/${id}`);
    setOrdersState({
      ...ordersState,
      orders: orders.filter((order) => order.id !== id),
    });
  };

  const handleOrderUpdate = async (e, id) => {
    e.preventDefault();
    const newDate = new Date();
    const data = {
      id: order.id,
      username: user.username,
      quantity: updatedQuantity,
      date: newDate,
    };
    const response: AxiosResponse<Order, any> = await axios.put(
      "/orders/update/:id",
      data,
      {
        headers: { Authorization: authStr },
      }
    );
    const updatedOrder: Order = response.data;

    setOrdersState({
      ...ordersState,
      orders: orders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      ),
    });
    setIsUpdating(false);
  };

  const handleQuantityChange = (e) => {
    e.preventDefault();
    setUpdatedQuantity(parseInt(e.target.value));
  };

  return (
    <>
      {!isUpdating ? (
        <div className="orderItem" key={order.id}>
          <div className="orderItem-username username">{order.username}</div>
          <div className="orderItem-quantity quantity">{order.quantity}</div>
          <div className="orderItem-date date">
            {new Date(order.date).toLocaleDateString()}
          </div>
          {order.username === user.username ? (
            <div className="orderItem-actions actions">
              <div className="update" onClick={() => setIsUpdating(true)}>
                update
              </div>
              <div
                className="delete"
                onClick={(e) => handleOrderDelete(e, order.id)}
              >
                delete
              </div>
            </div>
          ) : (
            <div className="spacer"></div>
          )}
        </div>
      ) : (
        <div className="orderItem" key={order.id}>
          <div className="orderItem-username username">{order.username}</div>
          <div className="orderItem-quantity quantity">
            <input
              type="number"
              value={updatedQuantity}
              onChange={handleQuantityChange}
            />
          </div>
          <div className="orderItem-date date">
            {new Date(order.date).toLocaleDateString()}
          </div>
          {order.username === user.username && (
            <div className="orderItem-actions actions">
              <div
                className="validate"
                onClick={(e) => handleOrderUpdate(e, order.id)}
              >
                validate
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OrderItem;
