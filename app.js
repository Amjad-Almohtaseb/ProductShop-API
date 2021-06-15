const express = require("express");
const productsRoutes = require("./routes/productsRoutes");

const app = express();
app.use(express.json());
app.use("/products", productsRoutes);

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
