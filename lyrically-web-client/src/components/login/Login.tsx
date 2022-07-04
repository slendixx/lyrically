import React from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
const CLIENT_ID =
  "141949774599-dse5jl58i12coo5p8l7gtf0lp1hbkvbj.apps.googleusercontent.com";

const Login: React.FC = () => {
  const onSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log("Login success!", response);
  };
  const onFailure = (response: GoogleLoginResponse) => {
    console.log("Login failure.", response);
  };

  return (
    <div id="loginButton">
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
};

export default Login;
