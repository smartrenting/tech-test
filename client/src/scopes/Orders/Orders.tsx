import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "../../config/axios";
import { useAppContext } from "../../contexts/AppContext";
import OrderForm from "./OrderForm";
import OrderItem from "./OrderItem";
import OrderList from "./OrderList";

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
            orders: orders.map((order) => ({
              id: order._id,
              ...order,
            })),
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
    //console.log(orders);
  }, [orders]);

  return (
    <div className="Orders">
      <div className="table">
        <OrderForm />
        <OrderList authStr={authStr} />
      </div>
      <Stats />
    </div>
  );
}
