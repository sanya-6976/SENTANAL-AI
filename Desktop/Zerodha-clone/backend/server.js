const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/risk-score", require("./routes/risk"));
app.use("/portfolio", require("./routes/portfolio"));
app.use("/ai-analysis", require("./routes/ai"));

app.listen(5000, () => console.log("Server running on 5000"));