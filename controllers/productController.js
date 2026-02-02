const db = require("../config/db");

exports.getProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.addProduct = (req, res) => {
  const { name, price, quantity, category } = req.body;

  const sql =
    "INSERT INTO products (name, price, quantity, category) VALUES (?,?,?,?)";

  db.query(sql, [name, price, quantity, category], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product added" });
  });
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price, quantity, category } = req.body;

  const sql =
    "UPDATE products SET name=?, price=?, quantity=?, category=? WHERE id=?";
  db.query(sql, [name, price, quantity, category, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product updated" });
  });
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product deleted" });
  });
};
