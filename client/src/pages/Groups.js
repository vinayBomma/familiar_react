import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Menu,
  Typography,
  Box,
  Fab,
  makeStyles,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  cardColor: {
    backgroundImage:
      "linear-gradient( 108deg,  rgba(0,166,81,1) 9.3%, rgba(0,209,174,1) 118.3% );",
    color: "white",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    // backgroundColor: "cyan",
  },
  //   toolbar: theme.mixins.toolbar
  //   cardText: {
  //       color: ,
  //   }
}));

const Groups = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
      <Grid container className={classes.toolbar}>
        <Grid item md={6} xs={12} lg={4}>
          <Box mt={3}>
            <Card className={classes.cardColor}>
              <CardHeader
                style={{ textAlign: "left" }}
                titleTypographyProps={{ variant: "h6" }}
                title="Dunder Mifflin"
                action={
                  <IconButton onClick={handleClick}>
                    <MoreHorizIcon style={{ color: "white" }} />
                  </IconButton>
                }
              ></CardHeader>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Map</MenuItem>
                <MenuItem onClick={handleClose}>Chat</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
              </Menu>
              <CardContent style={{ textAlign: "left" }}>
                <Typography variant="subtitle2">4 Members</Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
      <Fab style={{ backgroundColor: "cyan" }} className={classes.fab} aria-label="add">
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default Groups;
