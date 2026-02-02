const express = require("express");
const cors = require("cors");
const app = express();

require("./config/db");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
