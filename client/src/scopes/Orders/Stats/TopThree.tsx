import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../contexts/AppContext";
import { getTopThreeUser } from "./helper";
import TopThreeCard from "./TopThreeCard";

const TopThree = () => {
  const { ordersState } = useAppContext();
  const [topThree, setTopThree] = useState([]);

  useEffect(() => {
    setTopThree(getTopThreeUser(ordersState.orders));
  }, [ordersState.orders]);

  return (
    <div>
      <h2>Top 3 Pizza Eater</h2>
      <div className="topThree">
        {topThree[1] && <TopThreeCard user={topThree[1]} classname=" silver" />}
        {topThree[0] && <TopThreeCard user={topThree[0]} classname=" gold" />}
        {topThree[2] && <TopThreeCard user={topThree[2]} classname=" bronze" />}
      </div>
    </div>
  );
};

export default TopThree;
