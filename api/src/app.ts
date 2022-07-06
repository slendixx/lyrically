//TODO Research more about google apis service account authentication and authorization
// https://github.com/googleapis/google-api-nodejs-client

// import express from "express";

// const app = express();

// app.use(express.static(__dirname + "/public"));

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log("server running on port: " + port);
// });

import fs, { realpath } from "fs";
import readline from "readline";
import { google } from "googleapis";
import { auth, OAuth2Client } from "google-auth-library";

interface GoogleCredentials {
  installed: {
    client_id: string;
    project_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_secret: string;
    redirect_uris: string[];
  };
}

const SCOPES = ["https://www.googleapis.com/auth/drive"];
const TOKEN_PATH = "token.json";

fs.readFile("credentials.json", "utf-8", (error, content) => {
  if (error) return console.log("Error loading client secret file:", error);
  authorize(JSON.parse(content), printDocTitle);
});

function authorize(credentials: GoogleCredentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_secret,
    client_id,
    redirect_uris[0]
  );

  fs.readFile(TOKEN_PATH, "utf-8", (error, token) => {
    if (error) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getNewToken(oAuth2Client: OAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url", authUrl);
  const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  r1.question("Enter the code fromthat");
}
