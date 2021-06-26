const express = require("express");
const productsRoutes = require("./routes/productsRoutes");
const db = require("./db/models");

const app = express();
app.use(express.json());
app.use("/products", productsRoutes);
//db.sequelize.authenticate(); //only used to check that i fill data correctly in config.json
db.sequelize.sync();
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
