const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./model/db");
const cors = require("cors");

const authRouter = require("./routes/authRouter");
const productRouter = require("./routes/ProductRouter");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("The server is up and running...");
});

app.use("/auth", authRouter);

app.use("/products", productRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
