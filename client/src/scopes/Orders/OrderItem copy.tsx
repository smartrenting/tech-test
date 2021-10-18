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
        <tr key={order.id}>
          <td>{order.username}</td>
          <td>{order.quantity}</td>
          <td>{new Date(order.date).toLocaleDateString()}</td>
          {order.username === user.username && (
            <td>
              <button onClick={() => setIsUpdating(true)}>update</button>
              <button onClick={(e) => handleOrderDelete(e, order.id)}>
                delete
              </button>
            </td>
          )}
        </tr>
      ) : (
        <tr key={order.id}>
          <td>{order.username}</td>
          <td>
            <input
              type="number"
              value={updatedQuantity}
              onChange={handleQuantityChange}
            />
          </td>
          <td>{new Date(order.date).toLocaleDateString()}</td>
          {order.username === user.username && (
            <td>
              <button onClick={(e) => handleOrderUpdate(e, order.id)}>
                validate
              </button>
            </td>
          )}
        </tr>
      )}
    </>
  );
};

export default OrderItem;
