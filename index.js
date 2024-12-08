require("dotenv").config();

const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

const userRoutes = require("./routes/user");

app.use("/user", userRoutes);

app.get("/", async (req, res) => {
  console.log(req.body);
  res.send("Welcome to API Deployment By Vercel");
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server Listening on PORT : ", PORT);
});
