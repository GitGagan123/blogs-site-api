const express = require("express");
const cors = require("cors");
const router = express.Router()

const app = express();
app.use(cors());

router.get("/", (req, res) => {
  res.json({ message: "Welcome to User API" });
});

router.get("/details", async (req, res) => {
  res.send("Welcome to User Details By Vercel");
});

router.get("/:id", (req, res) => {
  const requestedId = req.params.id;
  res.send(`Information for the User with ${requestedId}`);
});

module.exports = router
