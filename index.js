const express = require("express");
const { google } = require("googleapis");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const request = require("request");
require("dotenv").config();

const app = express();
const port = 1234;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
  res.send("success");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
