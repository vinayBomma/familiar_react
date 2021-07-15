import {
  AppBar,
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Slide,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import KeyIcon from "@material-ui/icons/VpnKey";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { forwardRef, useState } from "react";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Settings = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Group Settings
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Box mt={3} ml={2}>
          <Typography variant="body2">Admin Controls</Typography>
        </Box>
        <List>
          <ListItem button>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit Name" secondary="Edit group name" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <KeyIcon />
            </ListItemIcon>
            <ListItemText
              primary="Change Code"
              secondary="Change invite code of group"
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText
              primary="Assign Admin"
              secondary="Assign admin status to members"
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <RemoveCircleIcon />
            </ListItemIcon>
            <ListItemText
              primary="Remove Member"
              secondary="Remove members from the group"
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DeleteForeverIcon />
            </ListItemIcon>
            <ListItemText
              primary="Delete Group"
              secondary="Delete the group. This can't be undone"
            />
          </ListItem>
        </List>
        <Divider />
        <Box mt={3} ml={2}>
          <Typography variant="body2">General</Typography>
        </Box>
        <List>
          <ListItem button>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="List Members" secondary="List all the mmembers in the group" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <KeyIcon />
            </ListItemIcon>
            <ListItemText
              primary="Share"
              secondary="Share the group with your contacts"
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText
              primary="Copy Invite Code"
              secondary="Copy invite code to clipboard"
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <RemoveCircleIcon />
            </ListItemIcon>
            <ListItemText
              primary="Exit Group"
              secondary="Leave the group"
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DeleteForeverIcon />
            </ListItemIcon>
            <ListItemText
              primary="Report Group"
              secondary="Report this group to the developer"
            />
          </ListItem>
        </List>
      </Dialog>
    </>
  );
};

export default Settings;
