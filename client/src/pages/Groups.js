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
  SvgIcon,
  ListItemIcon,
} from "@material-ui/core";
import { useState } from "react";
import {
  ChatIcon,
  CogIcon,
  MapIcon,
  DotsHorizontalIcon,
  PlusIcon,
} from "@heroicons/react/outline";

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
              ></CardHeader>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {menuItems.map((item) => (
                  <MenuItem button key={item.name} onClick={handleClose}>
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
  );
};

export default Groups;
