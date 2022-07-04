import React from "react";
import { useEffect } from "react";
import "./App.css";
import Login from "src/components/login/Login";
import Logout from "src/components/logout/Logout";
import { gapi } from "gapi-script";

const CLIENT_ID =
  "141949774599-dse5jl58i12coo5p8l7gtf0lp1hbkvbj.apps.googleusercontent.com";
const API_KEY = "AIzaSyCEIsoXXmHl2CXOtOW68eZIEIPhZFrp8aI";
const SCOPES = "https://www.googleapis.com/auth/drive";

function App() {
  //this effect initializes gapi client with our clientId, apiKey and scopes when the app starts
  useEffect(() => {
    const initializeGoogleAPIClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
      });
    };
    gapi.load("client:auth2", initializeGoogleAPIClient);
  });
  const createFile = (tag: string) => {
    //get client-side access token for the user
    const accessToken = gapi.auth.getToken().access_token;
    fetch("https://docs.googleapis.com/v1/documents", {
      method: "POST",
      headers: new Headers({ Authorization: "Bearer " + accessToken }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        window.open(
          `https://docs.google.com/document/d/${response.documentId}/edit`,
          "_blank"
        );
      });
  };

  return (
    <div className="App">
      <Login />
      <Logout />
      <button
        onClick={() => {
          createFile("CPTS 233");
        }}
      >
        Create CPTS 233 Notes
      </button>
    </div>
  );
}

export default App;
