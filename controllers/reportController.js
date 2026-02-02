const db = require("../config/db");

exports.getSummary = (req, res) => {
  const sql = `
    SELECT 
      COUNT(*) AS totalProducts,
      SUM(quantity) AS totalQuantity,
      SUM(price * quantity) AS totalValue,
      SUM(CASE WHEN quantity = 0 THEN 1 ELSE 0 END) AS outOfStock
    FROM products
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};
