import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../contexts/AppContext";
import { getAllUserQuantity } from "./helper";

const UserQuantityList = () => {
  const { ordersState } = useAppContext();
  const { orders } = ordersState;
  const [userAndQuantity, setUserAndQuantity] =
    useState<Array<[string, number]>>();

  useEffect(() => {
    setUserAndQuantity(
      getAllUserQuantity(orders).sort((a, b) => a[0].localeCompare(b[0]))
    );
  }, [orders]);

  useEffect(() => {
    //console.log(userAndQuantity);
  }, [userAndQuantity]);
  return (
    <div className="userAndQuantity">
      <h2>Total order by user</h2>
      <div className="userAndQuantityList">
        {userAndQuantity?.map((user) => {
          return (
            <div className="userAndQuantityItem" key={user[0]}>
              <div>{user[0]}</div>
              <div>{user[1]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserQuantityList;
