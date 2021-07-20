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
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  ListItem,
  List,
  ListItemText,
} from "@material-ui/core";
import { forwardRef, useState } from "react";
import {
  ChatIcon,
  CogIcon,
  MapIcon,
  DotsHorizontalIcon,
  PlusIcon,
  XIcon,
  DuplicateIcon,
  ShareIcon,
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
  },
  appBar: {
    position: "relative",
    color: "primary",
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
  const [dialog, setDialogOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [groupName, setGroupName] = useState("");

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

  const genCode = () => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setInviteCode(result);
    // this.inviteCodeSetting = result;
  };

  const copyCode = () => {
    if (inviteCode) {
      navigator.clipboard.writeText(inviteCode);
      // this.msg = "Invite code copied to clipboard";
      // this.snackbar = true;
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const shareGroup = () => {
    if (navigator.share) {
      if (groupName && inviteCode) {
        navigator.share({
          title: "Familiar",
          text: `Join the ${groupName} group with the invite code ${inviteCode}`,
          url: "https://localhost:3000/groups",
        });
      }
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
        <Fab
          className={classes.fab}
          aria-label="add"
          color="primary"
          onClick={() => setDialogOpen(true)}
        >
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
        {openMap && <Map />}
        {openChat && <Chats />}
      </Dialog>

      <Dialog open={dialog} onClose={handleDialogClose} fullWidth>
        <DialogTitle style={{ textAlign: "center" }} id="alert-dialog-title">
          {"Create Group"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Group Name"
            variant="outlined"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            style={{ width: "100%" }}
          />
          <Box display="flex" mt={2}>
            <FormControl variant="outlined" style={{ width: "100%" }}>
              <OutlinedInput
                readOnly
                placeholder="Generate Invite Code"
                value={inviteCode}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={copyCode} edge="end">
                      <SvgIcon>
                        <DuplicateIcon />
                      </SvgIcon>
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box ml={1} mr={-2} alignSelf="center">
              <Button onClick={genCode} style={{ color: "#4DB6AC" }}>
                Generate
              </Button>
            </Box>
          </Box>
          <Box mt={1}>
            <List>
              <ListItem button onClick={shareGroup}>
                <ListItemIcon>
                  <SvgIcon>
                    <ShareIcon />
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText
                  primary={"Share"}
                  secondary={"Share the group with your contacts"}
                />
              </ListItem>
            </List>
          </Box>
        </DialogContent>
        <Box mt={2}>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button
              onClick={handleDialogClose}
              color="primary"
              variant="contained"
            >
              Create
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default Groups;
