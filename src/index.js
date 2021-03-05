
const cors = require("cors");

const express = require("express");

const route = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(route);

app.listen(8080, () => console.log("Server running"));