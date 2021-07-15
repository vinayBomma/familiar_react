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
  SvgIcon,
} from "@material-ui/core";
import {
  ExclamationCircleIcon,
  KeyIcon,
  LogoutIcon,
  PencilIcon,
  ShareIcon,
  TrashIcon,
  UserGroupIcon,
  UserRemoveIcon,
  UsersIcon,
  XIcon,
  DuplicateIcon,
} from "@heroicons/react/outline";

import { forwardRef, useState } from "react";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "teal"
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
  const [open, setOpen] = useState(false);

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
              <SvgIcon>
                <XIcon />
              </SvgIcon>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Group Settings
            </Typography>
          </Toolbar>
        </AppBar>
        <Box mt={3} ml={2}>
          <Typography variant="body2">Admin Controls</Typography>
        </Box>
        <List>
          <ListItem button>
            <ListItemIcon>
              <SvgIcon>
                <PencilIcon />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText primary="Edit Name" secondary="Edit group name" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SvgIcon>
                <KeyIcon />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText
              primary="Change Code"
              secondary="Change invite code of group"
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SvgIcon>
                <UsersIcon />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText
              primary="Assign Admin"
              secondary="Assign admin status to members"
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SvgIcon>
                <UserRemoveIcon />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText
              primary="Remove Member"
              secondary="Remove members from the group"
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SvgIcon>
                <TrashIcon />
              </SvgIcon>
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
              <SvgIcon>
                <UserGroupIcon />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText
              primary="List Members"
              secondary="List all the mmembers in the group"
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SvgIcon>
                <ShareIcon />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText
              primary="Share"
              secondary="Share the group with your contacts"
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SvgIcon>
                <DuplicateIcon />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText
              primary="Copy Invite Code"
              secondary="Copy invite code to clipboard"
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SvgIcon>
                <LogoutIcon />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText primary="Exit Group" secondary="Leave the group" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SvgIcon>
                <ExclamationCircleIcon />
              </SvgIcon>
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
