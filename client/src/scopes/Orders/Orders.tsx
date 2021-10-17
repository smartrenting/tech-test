import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "../../config/axios";
import { useAppContext } from "../../contexts/AppContext";

import "./Orders.css";

export default function Orders() {
  const history = useHistory();
  const { token, user, ordersState, setOrdersState } = useAppContext();
  const { quantity, orders } = ordersState;
  const authStr = "Bearer ".concat(token);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response: AxiosResponse<any, any> = await axios.get("/orders", {
          headers: {
            Authorization: authStr,
          },
        });
        const orders = response.data;
        if (orders)
          setOrdersState({
            ...ordersState,
            orders,
          });
      } catch {
        history.push("/login");
      }
    }
    fetchOrders();
  }, []);

  useEffect(() => {
    if (!user) history.push("/login");
  }, [user]);

  useEffect(() => {
    console.log(ordersState);
  }, [ordersState]);

  const handleOrder = async () => {
    if (user) {
      if (quantity === 0) return;
      const response = await axios.post(
        "orders/add",
        { id: user.id, quantity },
        {
          headers: {
            Authorization: authStr,
          },
        }
      );
      setOrdersState({
        ...ordersState,
        orders: [...orders, response.data],
        quantity,
      });
    }
  };

  const handleDeleteList = async (e) => {
    e.preventDefault();
    await axios.delete("/orders/delete");
    setOrdersState({
      ...ordersState,
      orders: [],
    });
  };

  const handleQuantityChange = (e) => {
    e.preventDefault();
    setOrdersState({
      ...ordersState,
      quantity: parseInt(e.target.value),
    });
  };

  return (
    <div className="Orders">
      <div className="table">
        <div className="control">
          <label htmlFor="count">
            Nombre de pizza&nbsp;
            <input
              type="number"
              id="count"
              value={quantity}
              onChange={handleQuantityChange}
            ></input>
          </label>
          <button onClick={handleOrder}>{`Ajouter une commande`}</button>
          <button onClick={handleDeleteList}>{`Supprimer la liste`}</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>username</th>
              <th>quantity</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{user?.username}</td>
                <td>{order.quantity}</td>
                <td>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="stats"></div>
    </div>
  );
}
