import { Box, Button, Grid, Icon, SvgIcon } from "@material-ui/core";

const SignIn = () => {
  const svgIcon = (
    <Icon>
      <img
        src="google.svg"
        style={{ height: "20px", width: "20px", marginBottom: "4px" }}
      />
    </Icon>
  );
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{ height: "90vh" }}
      >
        <Button variant="contained" startIcon={svgIcon}>
          Log in with Google
        </Button>
      </Box>
    </>
  );
};

export default SignIn;
