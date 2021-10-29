import React from "react";

import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="Dashboard">
      <div className="table">
        <div className="control">
          <label htmlFor="price">
            Goalie:
            <input type="number" id="goalie"></input>
          </label>
          <button>{`Ajouter un score`}</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>username</th>
              <th>goalie</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Maxime</td>
              <td>2</td>
              <td>{new Date().toDateString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="stats"></div>
    </div>
  );
}
