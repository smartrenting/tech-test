import React from "react";
import axios from "../../config/axios";
import { useAppContext } from "../../contexts/AppContext";
import { isNumber } from "../../utils/utils";

const OrderForm = () => {
  const { token, user, ordersState, setOrdersState } = useAppContext();
  const { quantity, orders } = ordersState;
  const authStr = "Bearer ".concat(token);

  const handleQuantityChange = (e) => {
    e.preventDefault();
    if (!isNumber(e.target.value)) return;
    const value = e.target.value || 0;
    setOrdersState({
      ...ordersState,
      quantity: parseInt(value),
    });
  };

  const handleOrder = async () => {
    if (user) {
      if (quantity === 0) return;
      const response = await axios.post(
        "orders/add",
        { username: user.username, quantity },
        {
          headers: {
            Authorization: authStr,
          },
        }
      );
      setOrdersState({
        ...ordersState,
        orders: [...orders, response.data],
        quantity: 0,
      });
    }
  };

  const handleDeleteList = async (e) => {
    e.preventDefault();
    await axios.delete("/orders/delete", {
      headers: {
        Authorization: authStr,
      },
    });
    setOrdersState({
      ...ordersState,
      orders: [],
    });
  };

  const handleAddOrRemove = (action) => {
    const newQuantity = action === "add" ? quantity + 1 : quantity - 1;
    if (newQuantity < 0) return;
    setOrdersState({
      ...ordersState,
      quantity: newQuantity,
    });
  };

  return (
    <div className="orderForm">
      <h2>How many Pizza do you want ?</h2>
      <div className="addContainer">
        <input
          type="text"
          id="count"
          value={quantity === 0 ? "" : quantity}
          onChange={handleQuantityChange}
        ></input>
        <div className="addOrRemove">
          <div className="btn" onClick={() => handleAddOrRemove("add")}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="plus"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"
              ></path>
            </svg>
          </div>
          <div className="btn" onClick={() => handleAddOrRemove("remove")}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="minus"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="btn order rounded" onClick={handleOrder}>
          ORDER
        </div>
        <div className="btn outline rounded faded" onClick={handleDeleteList}>
          delete list
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
