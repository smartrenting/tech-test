import { AxiosResponse } from "axios";
import React, { useState } from "react";
import axios from "../../config/axios";
import { useAppContext } from "../../contexts/AppContext";
import { Order } from "../../models/Order";
import { isNumber } from "../../utils/utils";

const OrderItem = ({ order, authStr }: { order: Order; authStr: string }) => {
  const { user, ordersState, setOrdersState } = useAppContext();
  const { orders } = ordersState;
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedQuantity, setUpdatedQuantity] = useState<number>(
    order.quantity
  );

  const handleOrderDelete = async (e, id) => {
    e.preventDefault();
    await axios.delete(`/orders/delete/${id}`, {
      headers: {
        Authorization: authStr,
      },
    });
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
    if (!isNumber(e.target.value)) return;
    const value = e.target.value || 0;
    setUpdatedQuantity(parseInt(value));
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
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="pen"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M497.9 74.16L437.8 14.06c-18.75-18.75-49.19-18.75-67.93 0l-56.53 56.55l127.1 128l56.56-56.55C516.7 123.3 516.7 92.91 497.9 74.16zM290.8 93.23l-259.7 259.7c-2.234 2.234-3.755 5.078-4.376 8.176l-26.34 131.7C-1.921 504 7.95 513.9 19.15 511.7l131.7-26.34c3.098-.6191 5.941-2.141 8.175-4.373l259.7-259.7L290.8 93.23z"
                  ></path>
                </svg>
              </div>
              <div
                className="delete"
                onClick={(e) => handleOrderDelete(e, order.id)}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="trash"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M53.21 467c1.562 24.84 23.02 45 47.9 45h245.8c24.88 0 46.33-20.16 47.9-45L416 128H32L53.21 467zM432 32H320l-11.58-23.16c-2.709-5.42-8.25-8.844-14.31-8.844H153.9c-6.061 0-11.6 3.424-14.31 8.844L128 32H16c-8.836 0-16 7.162-16 16V80c0 8.836 7.164 16 16 16h416c8.838 0 16-7.164 16-16V48C448 39.16 440.8 32 432 32z"
                  ></path>
                </svg>
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
              type="text"
              value={updatedQuantity === 0 ? "" : updatedQuantity}
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
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="check"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32c8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4C431.6 99.13 439.8 96 448 96C465.1 96 480 109.7 480 128z"
                  ></path>
                </svg>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OrderItem;
