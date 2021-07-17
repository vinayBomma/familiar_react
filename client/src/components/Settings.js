import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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
  DuplicateIcon,
} from "@heroicons/react/outline";

import { useState } from "react";

const adminControls = [
  { id: 1, text: "Edit Name", subText: "Edit group name", icon: PencilIcon },
  {
    id: 2,
    text: "Change Code",
    subText: "Change invite code of group",
    icon: KeyIcon,
  },
  {
    id: 3,
    text: "Assign Admin",
    subText: "Assign admin status to members",
    icon: UsersIcon,
  },
  {
    id: 4,
    text: "Remove Member",
    subText: "Remove members from the group",
    icon: UserRemoveIcon,
  },
  {
    id: 5,
    text: "Delete Group",
    subText: "Delete the group. This can't be undone",
    icon: TrashIcon,
  },
];

const generalControls = [
  {
    id: 1,
    text: "List Members",
    subText: "List all the mmembers in the group",
    icon: UserGroupIcon,
  },
  {
    id: 2,
    text: "Share",
    subText: "Share the group with your contacts",
    icon: ShareIcon,
  },
  {
    id: 3,
    text: "Copy Invite Code",
    subText: "Copy invite code to clipboard",
    icon: DuplicateIcon,
  },
  {
    id: 4,
    text: "Exit Group",
    subText: "Leave the group",
    icon: LogoutIcon,
  },
  {
    id: 5,
    text: "Report Group",
    subText: "Report this group to the developer",
    icon: ExclamationCircleIcon,
  },
];

const Settings = () => {
  return (
    <>
      <Box mt={3} ml={2}>
        <Typography variant="body2">Admin Controls</Typography>
      </Box>
      <List>
        {adminControls.map((adminControls) => (
          <ListItem button key={adminControls.id} onClick={() => "hello"}>
            <ListItemIcon>
              <SvgIcon>
                <adminControls.icon />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText
              primary={adminControls.text}
              secondary={adminControls.subText}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box mt={3} ml={2}>
        <Typography variant="body2">General</Typography>
      </Box>
      <List>
        {generalControls.map((generalControls) => (
          <ListItem button key={generalControls.id} onClick={() => "hello"}>
            <ListItemIcon>
              <SvgIcon>
                <generalControls.icon />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText
              primary={generalControls.text}
              secondary={generalControls.subText}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Settings;
