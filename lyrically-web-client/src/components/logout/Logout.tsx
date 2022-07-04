import React from "react";
import {
  GoogleLogout,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
const CLIENT_ID =
  "141949774599-dse5jl58i12coo5p8l7gtf0lp1hbkvbj.apps.googleusercontent.com";
const Logout: React.FC = () => {
  const onSuccess = () => {
    console.log("Logout success!");
  };
  return (
    <div id="logoutButton">
      <GoogleLogout
        clientId={CLIENT_ID}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
};

export default Logout;
