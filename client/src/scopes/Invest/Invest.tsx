import React from "react";

import "./Invest.css";

export default function Invest() {
  return (
    <div className="Invest">
      <div className="table">
        <div className="control">
          <div className="control-left">
            <label htmlFor="price">
              Price
              <input type="number" id="price"></input>
            </label>
            <label htmlFor="company">
              Company
              <input id="company"></input>
              </label>
          </div>    
          <button>{`Ajouter une option d'achat`}</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>username</th>
              <th>company</th>
              <th>price</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Example</td>
              <td>Smartrenting</td>
              <td>100$</td>
              <td>{new Date().toDateString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="stats"></div>
    </div>
  );
}
