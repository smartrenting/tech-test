import React from "react";

import "./Beers.css";

export default function Beers() {
  return (
    <div className="Beers">
      <div className="table">
        <div className="control">
          <label htmlFor="pints">
            Pints
            <input type="number" id="pints"></input>
          </label>
          <button>{`Ajouter un score`}</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>username</th>
              <th>pints</th>
              <th>drink date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pierre</td>
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
