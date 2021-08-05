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
  OutlinedInput,
  InputAdornment,
  ListItem,
  List,
  ListItemText,
} from "@material-ui/core";
import { forwardRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
import { useQuery, useMutation, gql } from "@apollo/client";

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

const CREATE_GROUP = gql`
  mutation createGroup(
    $name: String!
    $totalMembers: Int!
    $inviteCode: String!
    $members: [String]
    $admin: [String]
  ) {
    createGroup(
      name: $name
      totalMembers: $totalMembers
      inviteCode: $inviteCode
      members: $members
      admin: $admin
    ) {
      name
      inviteCode
    }
  }
`;

const GET_GROUP = gql`
  query getGroup($id: String!) {
    getGroup(id: $id) {
      name
      totalMembers
      _id
    }
  }
`;

const SET_LOCATION = gql`
  mutation setLocation(
    $location: [String]!
    $uid: String!
    $batteryLevel: Int!
  ) {
    setLocation(location: $location, uid: $uid, batteryLevel: $batteryLevel) {
      location
    }
  }
`;

const Groups = () => {
  const classes = useStyles();
  const history = useHistory();
  const [createGroup] = useMutation(CREATE_GROUP);
  const [setLocation] = useMutation(SET_LOCATION);
  const authData = JSON.parse(localStorage.getItem("profile"));

  const { loading, error, data } = useQuery(GET_GROUP, {
    variables: {
      id: authData.googleId,
    },
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [openSetting, setSetting] = useState(false);
  const [openMap, setMap] = useState(false);
  const [openChat, setChat] = useState(false);
  const [option, setOption] = useState(null);
  const [dialog, setDialogOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupID, setGroupID] = useState(null);
  const [toolbarTitle, setToolbarTitle] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (val, id) => {
    setAnchorEl(null);
    setGroupID(id);
    if (val === "Settings") {
      setSetting(true);
      setOption("Settings");
      setToolbarTitle("Group Settings");
    } else if (val === "Map") {
      setMap(true);
      setOption("Map");
      setToolbarTitle("Map");
    } else if (val === "Chat") {
      setChat(true);
      setOption("Chat");
      setToolbarTitle("Chat");
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

  const handleCreateGroup = () => {
    if (groupName && inviteCode) {
      createGroup({
        variables: {
          name: groupName,
          inviteCode: inviteCode,
          totalMembers: 1,
          members: authData.googleId,
          admin: authData.googleId,
        },
      });
      setDialogOpen(false);
      history.go(0);
    }
  };

  const handleLocation = () => {
    var batteryLevel;
    navigator.getBattery().then((battery) => {
      batteryLevel = Math.floor(battery.level * 100);
    });
    const getPosition = (position) => {
      setLocation({
        variables: {
          location: [
            `${position.coords.latitude}`,
            `${position.coords.longitude}`,
          ],
          uid: authData.googleId,
          batteryLevel,
        },
      });
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition);
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
  };

  const copyCode = () => {
    if (inviteCode) {
      navigator.clipboard.writeText(inviteCode);
      // TODO Add Snackbars
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
          {loading ? (
            <p>Loading...</p>
          ) : (
            data.getGroup.map((group) => (
              <Grid item md={4} xs={12} lg={4} sm={6} key={group._id}>
                <Box mt={3} mx={1}>
                  <Card className={classes.cardColor} onClick={handleLocation}>
                    <CardHeader
                      style={{ textAlign: "left" }}
                      titleTypographyProps={{ variant: "h6" }}
                      title={group.name}
                      action={
                        <IconButton onClick={handleClick}>
                          <SvgIcon>
                            <DotsHorizontalIcon />
                          </SvgIcon>
                        </IconButton>
                      }
                    />
                    <Menu
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={() => setAnchorEl(null)}
                    >
                      {menuItems.map((item) => (
                        <MenuItem
                          button
                          key={item.name}
                          onClick={() => handleClose(item.name, group._id)}
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
                      <Typography variant="subtitle2">
                        {group.totalMembers} members
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            ))
          )}
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
              {toolbarTitle}
            </Typography>
          </Toolbar>
        </AppBar>

        {openSetting && <Settings />}
        {openMap && <Map group={groupID} />}
        {openChat && <Chats />}
      </Dialog>

      <Dialog open={dialog} onClose={handleDialogClose} fullWidth>
        <DialogTitle
          style={{
            textAlign: "center",
          }}
        >
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
                  secondary={"Share group with your contacts"}
                />
              </ListItem>
            </List>
          </Box>
        </DialogContent>
        <Box mt={2}>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button
              onClick={handleCreateGroup}
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
