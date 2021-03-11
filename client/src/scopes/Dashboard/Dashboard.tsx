import React from "react";

import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="Dashboard">
      <div className="table">
        <div className="control">
          <label htmlFor="hours">
            Hours
            <input type="number" id="hours"></input>
          </label>
          <button>{`Ajouter un watch-time`}</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>username</th>
              <th>hours</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Example</td>
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
