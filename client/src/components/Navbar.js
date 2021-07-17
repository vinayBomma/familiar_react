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
} from "@material-ui/core";

import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  MenuIcon,
  ChevronLeftIcon,
  UserGroupIcon,
  InformationCircleIcon,
  ChatIcon,
  CogIcon,
  MapIcon,
} from "@heroicons/react/outline";

const drawerWidth = 240;

const navLinks = [
  { name: "Groups", path: "/", icon: UserGroupIcon },
  { name: "About", path: "/about", icon: InformationCircleIcon },
  { name: "Chats", path: "/chats", icon: ChatIcon },
  { name: "Settings", path: "/settings", icon: CogIcon },
  { name: "Map", path: "/map", icon: MapIcon },
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

const Navbar = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
            {location.pathname === "/" ? "Groups" : "Chats"}
          </Typography>

          <section className={classes.rightToolbar}>
            {location.pathname === "/" ? (
              <Button
                startIcon={
                  <SvgIcon>
                    <UserGroupIcon />
                  </SvgIcon>
                }
                style={{ color: "teal" }}
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

        <Avatar
          className={classes.avatar}
          src="https://lh3.googleusercontent.com/a-/AOh14GgSL9H-4yXSZcWrfQ3XKMBQZaqN70s6PR0mhkW8Zw=s96-c"
          alt="Paella dish"
        />
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
          ))}
          <Box mt={2} mb={2}>
            <Divider />
          </Box>
        </List>
      </Drawer>
      <div>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
};

export default Navbar;
