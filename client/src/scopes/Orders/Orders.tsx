import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "../../config/axios";
import { useAppContext } from "../../contexts/AppContext";
import OrderForm from "./OrderForm";
import OrderItem from "./OrderItem";

import "./Orders.css";
import Stats from "./Stats/Stats";

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
        if (orders) {
          setOrdersState({
            ...ordersState,
            orders,
          });
        }
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

  const handleOrderDelete = async (e, id) => {
    e.preventDefault();
    await axios.delete(`/orders/delete/${id}`);
    setOrdersState({
      ...ordersState,
      orders: orders.filter((order) => order.id !== id),
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
        <OrderForm />
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
      <Stats />
    </div>
  );
}
