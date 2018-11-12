import config from "./config";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { ws } from "./ws";
import * as Sentry from "@sentry/node";

const sentryConfig = { dsn: config.sentryDsn };

Sentry.init(sentryConfig);

const app = express();
app.use(Sentry.Handlers.requestHandler() as express.RequestHandler);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//word search endpoint
app.use("/ws", ws);

app.get("/test", (req, res) => {
  try {
    res.send("test");
    throw new Error("test event");
  } catch (e) {
    Sentry.captureException(e);
  }
});

app.listen(config.port, () => {
  console.log("listening on port:", config.port);
});
