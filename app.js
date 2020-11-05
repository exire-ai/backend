const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const router = require("./routes/venues");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/venues", router);

app.get("*", (req, res) => res.status(404).send({ message: `Route ${req.method} ${req.originalUrl} not found.` }));

app.listen(3000, () => {
  console.log("Running on http://localhost:3000");
});

module.exports = app;