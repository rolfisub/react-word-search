import * as express from "express";
import * as bodyParser from "body-parser";
import { ws } from "./ws";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//word search endpoint
app.use('/ws', ws);

app.listen(3001, () => {
  console.log("listening on port:", 3001);
});
