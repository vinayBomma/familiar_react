import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Divider,
  List,
  ListItemIcon,
  ListItemText,
  makeStyles,
  ListItem,
  SvgIcon,
  Avatar,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@material-ui/core";

import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authLogout, locationPermission } from "../app/authSlice";
import {
  MenuIcon,
  ChevronLeftIcon,
  UserGroupIcon,
  InformationCircleIcon,
  MapIcon,
  UserCircleIcon,
  LogoutIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";

import { useMutation, gql } from "@apollo/client";

const drawerWidth = 240;

const navLinks = [
  { name: "Groups", path: "/", icon: UserGroupIcon },
  { name: "About", path: "/about", icon: InformationCircleIcon },
  { name: "Map", path: "/map", icon: MapIcon },
  { name: "Sign In", path: "/signin", icon: UserCircleIcon },
];

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(13),
    height: theme.spacing(13),
    alignSelf: "center",
  },
  toolbar: theme.mixins.toolbar,
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  pageName: {
    marginLeft: theme.spacing(3),
  },
  rightToolbar: {
    marginLeft: "auto",
    marginRight: 2,
  },
}));

const JOIN_GROUP = gql`
  mutation joinGroup($inviteCode: String!, $members: [String]!) {
    joinGroup(inviteCode: $inviteCode, members: $members) {
      name
      _id
    }
  }
`;

const SET_LOCATION = gql`
  mutation setLocation($location: [String]!, $uid: String!, $batteryLevel: Int!) {
    setLocation(location: $location, uid: $uid, batteryLevel: $batteryLevel) {
      location
    }
  }
`;

const Navbar = ({ children }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const authData = JSON.parse(localStorage.getItem("profile"));
  const locationData = JSON.parse(localStorage.getItem("locationAllowed"));
  const [joinGroup] = useMutation(JOIN_GROUP);
  const [setLocation] = useMutation(SET_LOCATION);
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [dialog, setDialogOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleLogout = () => {
    dispatch(authLogout());
    history.push("/signin");
  };

  const handleLocation = () => {
    var batteryLevel;
    navigator.getBattery().then((battery) => {
      batteryLevel = Math.floor(battery.level * 100);
    });
    const getPosition = (position) => {
      dispatch(locationPermission(true));
      setLocation({
        variables: {
          location: [
            `${position.coords.latitude}`,
            `${position.coords.longitude}`,
          ],
          uid: authData.googleId,
          batteryLevel
        },
      });
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition);
    }
  }

  const handleJoinGroup = () => {
    if (inviteCode) {
      joinGroup({
        variables: {
          inviteCode: inviteCode,
          members: authData.googleId,
        },
      });
      setDialogOpen(false);
      history.go(0);
    }
  };

  return (
    <div>
      <AppBar position="fixed" style={{ backgroundColor: "#272727" }}>
        <Toolbar>
          <IconButton edge="start" aria-label="menu" onClick={handleDrawerOpen}>
            <SvgIcon>
              <MenuIcon />
            </SvgIcon>
          </IconButton>

          <Typography variant="h6" className={classes.pageName}>
            {location.pathname === "/"
              ? "Groups"
              : location.pathname === "/signin"
              ? "Sign In"
              : location.pathname === "/about"
              ? "About"
              : "Null"}
          </Typography>

          <section className={classes.rightToolbar}>
            {location.pathname === "/" ? (
              <Button
                onClick={() => setDialogOpen(true)}
                startIcon={
                  <SvgIcon>
                    <UserGroupIcon />
                  </SvgIcon>
                }
                color="primary"
              >
                Join Group
              </Button>
            ) : null}
          </section>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <SvgIcon>
              <ChevronLeftIcon />
            </SvgIcon>
          </IconButton>
        </div>

        {authData && (
          <Avatar
            className={classes.avatar}
            src={authData.imageUrl}
            alt="Paella dish"
          />
        )}

        <Box mt={3}>
          <Divider />
        </Box>

        <List>
          {navLinks.map((link) => (
            <ListItem
              button
              key={link.name}
              onClick={() => history.push(link.path)}
            >
              <ListItemIcon>
                <SvgIcon>
                  <link.icon />
                </SvgIcon>
              </ListItemIcon>
              <ListItemText primary={link.name} />
            </ListItem>
            // TODO Fix signin nav link when signedin, conditional nav links
          ))}
          {!locationData && (
            <ListItem>
              <Button
                onClick={handleLocation}
                fullWidth
                style={{ backgroundColor: "black" }}
                startIcon={
                  <SvgIcon>
                    <LocationMarkerIcon />
                  </SvgIcon>
                }
              >
                Enable Location
              </Button>
            </ListItem>
          )}
          <Box mt={2} mb={2}>
            <Divider />
          </Box>
          {authData && (
            <ListItem>
              <Button
                onClick={handleLogout}
                fullWidth
                style={{ backgroundColor: "teal" }}
                startIcon={
                  <SvgIcon>
                    <LogoutIcon />
                  </SvgIcon>
                }
              >
                Logout
              </Button>
            </ListItem>
          )}
        </List>
      </Drawer>
      <div>
        <div className={classes.toolbar}></div>
        {children}
      </div>

      {/* ================= Join Group ================== */}

      <Dialog open={dialog} onClose={handleDialogClose} fullWidth>
        <DialogTitle style={{ textAlign: "center" }} id="alert-dialog-title">
          {"Join Group"}
        </DialogTitle>
        <DialogContent>
          <TextField
            placeholder="Enter 6 digit code"
            variant="outlined"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            style={{ width: "100%" }}
          />
        </DialogContent>
        <Box mt={3}>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button
              onClick={handleJoinGroup}
              color="primary"
              variant="contained"
            >
              Join
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default Navbar;
