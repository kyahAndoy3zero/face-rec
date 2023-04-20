const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000;
const { errorHandler } = require("./middleware/errorMiddleWare");
const connectDB = require("./config/db");

connectDB();
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

app.use("/api/persons", require("./routes/personRoutes"));
app.use("/api/uploads", require("./routes/uploadRoutes"));
app.use("/api/commands", require("./routes/commandRoutes"));
app.use("/api/imports", require("./routes/importRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
