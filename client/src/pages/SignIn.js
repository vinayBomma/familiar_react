import { Box, Button, Icon } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { isAuth } from "../app/authSlice";
import GoogleLogin from "react-google-login";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const SignIn = () => {
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));
    if (user) {
      history.push("/");
    }
  });

  const dispatch = useDispatch();
  const svgIcon = (
    <Icon>
      <img
        src="google.svg"
        style={{ height: "20px", width: "20px", marginBottom: "4px" }}
      />
    </Icon>
  );

  const handleSuccess = (res) => {
    dispatch(isAuth(res.profileObj));
    history.push("/");
  };

  const handleFailure = async (err) => {
    console.log(err);
  };
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{ height: "90vh" }}
      >
        <GoogleLogin
          clientId="120451297244-ems52n9lvhpm9hk7cc5cr1od2gl31ue7.apps.googleusercontent.com"
          // TODO CREATE ENV FILES FOR SECRET KEYS
          // TODO Implement Logout button
          // TODO React Router Redirect Compo
          render={(renderProps) => (
            <Button
              onClick={renderProps.onClick}
              variant="contained"
              startIcon={svgIcon}
              style={{ textTransform: "none" }}
            >
              Sign In with Google
            </Button>
          )}
          onSuccess={handleSuccess}
          onFailure={handleFailure}
          cookiePolicy={"single_host_origin"}
        />
      </Box>
    </>
  );
};

export default SignIn;
