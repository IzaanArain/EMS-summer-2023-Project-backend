const express = require("express");
require("dotenv").config();
const EventRoutes = require("./routes/EventRoutes");
const UserRoutes = require("./routes/UserRoutes");
const ConnectDB = require("./config/DbConnection");
const colors = require("colors");
const ErrorHandler = require("./middleware/ErrorHandler");
const cors = require("cors");

const app = express();

ConnectDB();
// app.use(cors())
app.use(cors({
  origin:["https://ems-frontend-izaan.vercel.app","http://localhost:5173"],
  methods:["GET","POST","PUT","DELETE","PATCH"],
  credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`.magenta.italic);
  next();
});
app.use("/api/events/", EventRoutes);
app.use("/api/users", UserRoutes);
app.use(ErrorHandler);

app.get("/", (req, res) => {
  //  res.send("<h1>hello world<h1>")
  res.status(200).json({ message: "hello world" });
});

app.get("/:name", (req, res) => {
  res.send(`<h1>hello world ${req.params.name}<h1>`);
});

PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server connected at Port http://localhost:${PORT}/api/events/`);
  console.log(
    `Server connected at Port http://localhost:${PORT}/api/users/login`
  );
});
