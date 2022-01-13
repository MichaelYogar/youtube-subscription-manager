const express = require("express");
const morgan = require("morgan");
const { google } = require("googleapis");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const request = require("request");
require("dotenv").config();

const knex = require("knex")({
  client: "pg",
  connection: {
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },
});

const app = express();
app.use(morgan("dev"));
const port = 1234;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  try {
    const result = await knex.select("name").from("company");
    res.json(result);
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "An error occurred, please try again later.",
    });
  }
});

app.get("/getURL", (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.ID,
    process.env.SECRET,
    process.env.REDIRECT
  );

  const scopes = [
    "profile",
    "email",
    "openid",
    "https://www.googleapis.com/auth/youtube",
    "https://www.googleapis.com/auth/youtube.readonly",
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    state: JSON.stringify({
      callbackUrl: req.body.callbackUrl,
      userID: req.body.userid,
    }),
  });

  request(url, (err, response, body) => {
    console.log(err);
    console.log("statusCode", response && response.statusCode);
    res.send({ url });
  });
});

app.get("/test", async (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.ID,
    process.env.SECRET,
    process.env.REDIRECT
  );
  const tokens = await oauth2Client.getToken(req.query.code);
  https: res.send("success");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
