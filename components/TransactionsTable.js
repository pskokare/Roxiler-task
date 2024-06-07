

// import React from 'react';
// import './TransactionsTable.css';

// const TransactionsTable = ({ transactions }) => {
//   return (
//     <table className="transactions-table">
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>Title</th>
//           <th>Price</th>
//           <th>Description</th>
//           <th>Category</th>
//           <th>Sold</th>
//           <th>Date of Sale</th>
//         </tr>
//       </thead>
//       <tbody>
//         {transactions.map(transaction => (
//           <tr key={transaction.id}>
//             <td>{transaction.id}</td>
//             <td>{transaction.title}</td>
//             <td>{transaction.price}</td>
//             <td>{transaction.description}</td>
//             <td>{transaction.category}</td>
//             <td>{transaction.sold ? 'Yes' : 'No'}</td>
//             <td>{transaction.dateOfSale}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default TransactionsTable;


import React from 'react';
import './TransactionsTable.css';

const TransactionsTable = ({ transactions }) => {
  // Check if transactions is an array
  if (!Array.isArray(transactions)) {
    // If transactions is not an array, return null or render an error message
    return <div>No transactions available</div>;
  }

  return (
    <table className="transactions-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Price</th>
          <th>Description</th>
          <th>Category</th>
          <th>Sold</th>
          <th>Date of Sale</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(transaction => (
          <tr key={transaction.id}>
            <td>{transaction.id}</td>
            <td>{transaction.title}</td>
            <td>{transaction.price}</td>
            <td>{transaction.description}</td>
            <td>{transaction.category}</td>
            <td>{transaction.sold ? 'Yes' : 'No'}</td>
            <td>{transaction.dateOfSale}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
