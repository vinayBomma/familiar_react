import {
  AppBar,
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
  SvgIcon,
  ListItemIcon,
  Dialog,
  Toolbar,
  Slide,
} from "@material-ui/core";
import { forwardRef, useState } from "react";
import {
  ChatIcon,
  CogIcon,
  MapIcon,
  DotsHorizontalIcon,
  PlusIcon,
  XIcon,
} from "@heroicons/react/outline";

import Settings from "../components/Settings";
import Chats from "../components/Chats";
import Map from "../components/Map";

const menuItems = [
  { name: "Map", icon: MapIcon },
  { name: "Chat", icon: ChatIcon },
  { name: "Settings", icon: CogIcon },
];

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
    backgroundColor: "teal",
    color: "white",
  },
  appBar: {
    position: "relative",
    backgroundColor: "teal",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Groups = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openSetting, setSetting] = useState(false);
  const [openMap, setMap] = useState(false);
  const [openChat, setChat] = useState(false);
  const [option, setOption] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (val) => {
    setAnchorEl(null);
    if (val === "Settings") {
      setSetting(true);
      setOption("Settings");
    } else if (val === "Map") {
      setMap(true);
      setOption("Map");
    } else if (val === "Chat") {
      console.log('triggered')
      setChat(true);
      setOption("Chat");
    }
  };

  const handleOptionClose = () => {
    if (option === "Settings") {
      setSetting(false);
    } else if (option === "Map") {
      setMap(false);
    } else if (option === "Chat") {
      setChat(false);
    }
  };

  return (
    <>
      <Container>
        <Grid container className={classes.toolbar}>
          <Grid item md={4} xs={12} lg={4} sm={6}>
            <Box mt={3}>
              <Card className={classes.cardColor}>
                <CardHeader
                  style={{ textAlign: "left" }}
                  titleTypographyProps={{ variant: "h6" }}
                  title="Dunder Mifflin"
                  action={
                    <IconButton onClick={handleClick}>
                      <SvgIcon>
                        <DotsHorizontalIcon />
                      </SvgIcon>
                    </IconButton>
                  }
                />
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuItems.map((item) => (
                    <MenuItem
                      button
                      key={item.name}
                      onClick={() => handleClose(item.name)}
                    >
                      <ListItemIcon>
                        <SvgIcon>
                          <item.icon />
                        </SvgIcon>
                      </ListItemIcon>
                      {item.name}
                    </MenuItem>
                  ))}
                </Menu>
                <CardContent style={{ textAlign: "left" }}>
                  <Typography variant="subtitle2">4 Members</Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
        <Fab className={classes.fab} aria-label="add">
          <SvgIcon>
            <PlusIcon />
          </SvgIcon>
        </Fab>
      </Container>

      {/* =============== Full Screen Dialog ================ */}
      <Dialog
        fullScreen
        open={openSetting ? openSetting : openChat ? openChat : openMap}
        onClose={handleOptionClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleOptionClose}
              aria-label="close"
            >
              <SvgIcon>
                <XIcon />
              </SvgIcon>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Group Settings
            </Typography>
          </Toolbar>
        </AppBar>

        {openSetting && <Settings />}
        {openMap && <Map /> }
        {openChat && <Chats />}
      </Dialog>
    </>
  );
};

export default Groups;
