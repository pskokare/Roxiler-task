import React from 'react';

function Statistics({ statistics }) {
  return (
    <div>
      <h2>Statistics</h2>
      <p>Total Sale Amount: {statistics.total_sale}</p>
      <p>Total Sold Items: {statistics.total_sold_items}</p>
      <p>Total Not Sold Items: {statistics.total_not_sold_items}</p>
    </div>
  );
}

export default Statistics;

