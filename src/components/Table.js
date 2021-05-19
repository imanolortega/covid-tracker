import React from "react";
import "../App.css";

const Table = ({ countries }) => {
  return (
    <div className="table">
      <table className="table__full">
        <tbody>
          {countries.map(({ country, todayCases }) => {
            return (
              <tr key={country}>
                <td>{country} </td>
                <td>
                  <strong>{todayCases.toLocaleString("de-DE")}</strong>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
