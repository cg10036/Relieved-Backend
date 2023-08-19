const express = require("express");
const cors = require("cors");
const app = express();

const routes = require("./routes/routes");

app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.listen(3000, () => console.log("server is listening on port 3000"));
