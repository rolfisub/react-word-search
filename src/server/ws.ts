import * as express from "express";
const wordlist = require("wordlist-english");

export const ws = express.Router();

ws.get("/dictionary", (req, res) => {
  res.json(wordlist["english"]);
});
