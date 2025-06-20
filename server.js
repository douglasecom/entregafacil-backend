require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", require("./src/routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
