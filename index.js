const { connectionDb } = require("./Utils/database.js");
connectionDb().then(() => {
  const dotenv = require("dotenv");
  dotenv.config();
  const express = require("express");
  const cors = require("cors");
  const cookieParser = require("cookie-parser");
  const session = require("express-session");
  const app = express();
  const sessionStore = new session.MemoryStore();

  const { router } = require("./Routes/Routes.js");

  app.use(express.json());
  app.use(cookieParser());

  app.use(cors({ origin: true, credentials: true }));
  app.use(
    session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: +process.env.SESSION_AGE, // Session expiration time (in milliseconds)
        httpOnly: false,
      },
      store: sessionStore,
    })
  );

  app.use("/", router);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });

  app.listen(process.env.PORT);
  console.log("Listening on Port " + process.env.PORT + "...");
});
