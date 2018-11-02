import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { ws } from "./ws";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//word search endpoint
app.use('/ws', ws);

app.listen(3001, () => {
  console.log("listening on port:", 3001);
});
