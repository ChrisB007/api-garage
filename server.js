require("dotenv").config();
const express = require("express");
const rowdyLogger = require("rowdy-logger");
const mongoose = require("mongoose");
const riddles = require("./routes/riddles");
const medriddles = require("./routes/mediumRiddles");
const hardriddles = require("./routes/hardRiddles");

const app = express();
const PORT = process.env.PORT || 4040;

const dbURL = process.env.DATABASE_URL;

mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is successfully connected");
  })
  .catch((error) => {
    console.log(error);
  });

//middleware
const startRowdy = rowdyLogger.begin(app);
app.use(express.json());

//routes import
app.use("/api", riddles);
app.use("/api", medriddles);
app.use("/api", hardriddles);

app.get("/", (req, res) => {
  try {
    res.status(200).send({
      data: "When you die, what part of the body dies last? The pupils…they dilate. 🎉",
      error: "",
      status: 200,
    });
  } catch (error) {
    res.status(500).send({ data: {}, error: error, status: 500 });
  }
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>Resource not found</h1>");
});

//listen
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
  startRowdy.print();
});
