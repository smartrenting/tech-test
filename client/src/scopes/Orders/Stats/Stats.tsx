import React, { useEffect } from "react";
import AveragePizzaOrder from "./AveragePizzaByOrder";
import OrdersByDate from "./OrdersByDate";
import "./Stats.css";
import TopThree from "./TopThree";
import UserQuantityList from "./UserQuantityList";

const Stats = () => {
  return (
    <div className="stats">
      <h1>STATISTICS</h1>
      <TopThree />
      <AveragePizzaOrder />
      <UserQuantityList />
      <OrdersByDate />
    </div>
  );
};

export default Stats;
