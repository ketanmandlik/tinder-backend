import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import cards from "./dbCards.js";

// App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url =
  "mongodb+srv://admin:BYypswlNoyOIefnT@cluster0.mn6tz.mongodb.net/tinderdb?retryWrites=true&w=majority";

// Middleware

app.use(express.json());
app.use(Cors());
// DB Config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
// API Endpoints

app.get("/", (req, res) => {
  res.status(200).send("HELLO CLEVER PROGRAMMERS!!!");
});

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;
  cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Listerner
app.listen(port, () => console.log(`listing on localhost ${port}`));
