const express = require("express");
const shopsRoutes = require("./routes/shopRoutes");
const productsRoutes = require("./routes/productsRoutes");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/products", productsRoutes);
app.use("/shops", shopsRoutes);

//db.sequelize.authenticate(); //only used to check that i fill data correctly in config.json

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
