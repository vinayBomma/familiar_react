import { ArrowRightIcon } from "@heroicons/react/outline";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  ListItem,
  makeStyles,
  SvgIcon,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles(() => ({
  appBar: {
    top: "auto",
    bottom: -1,
    backgroundColor: "#272727",
  },
  test: {
    height: "70vh",
  },
}));

const Chats = () => {
  const classes = useStyles();
  return (
    <>
      <Box display="flex" flexDirection="row-reverse" style={{ width: "100%" }}>
        <Grid item container md={6} xs={8} lg={6} sm={6}>
          <Box mr={1} mt={2} style={{ marginLeft: "auto" }}>
            <Card style={{ minWidth: "150px", backgroundColor: "#00897B" }}>
              <CardContent>
                <Typography variant="caption">You</Typography>
                <span style={{ float: "right" }}>
                  <Typography variant="caption">9:22 pm</Typography>
                </span>
                <Box mt={1} mb={-1}>
                  <Typography variant="body2">Hello Everyone!</Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Box>

      <Box display="flex" flexDirection="row" style={{ width: "100%" }}>
        <Grid item container md={6} xs={8} lg={6} sm={6}>
          <Box ml={1} mt={2} style={{ marginRight: "auto" }}>
            <Card style={{ minWidth: "150px", backgroundColor: "#5C6BC0" }}>
              <CardContent>
                <Typography variant="caption">Mike</Typography>
                <span style={{ float: "right" }}>
                  <Typography variant="caption">9:22 pm</Typography>
                </span>
                <Box mt={1} mb={-1}>
                  <Typography variant="body2">
                    What happens when I enter a super long message? Like for
                    example, say I want to tell a story. The story goes like
                    this: A man comes across a ring, no ordinary ring that which
                    he is oblivious about. A ring to rule the entire world! But
                    instead of wearing the said ring and conquering the whole
                    world, the madlad pisses on it! Hello Everyone!
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Box>

      <Box display="flex" flexDirection="row" style={{ width: "100%" }}>
        <Grid item container md={6} xs={8} lg={6} sm={6}>
          <Box ml={1} mt={2} style={{ marginRight: "auto" }}>
            <Card style={{ minWidth: "150px", backgroundColor: "#5C6BC0" }}>
              <CardContent>
                <Typography variant="caption">Mike</Typography>
                <span style={{ float: "right" }}>
                  <Typography variant="caption">9:22 pm</Typography>
                </span>
                <Box mt={1} mb={-1}>
                  <Typography variant="body2">
                    What happens when I enter a super long message? Like for
                    example, say I want to tell a story. The story goes like
                    this: A man comes across a ring, no ordinary ring that which
                    he is oblivious about. A ring to rule the entire world! But
                    instead of wearing the said ring and conquering the whole
                    world, the madlad pisses on it! Hello Everyone!
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Box>

      <Box display="flex" flexDirection="row" style={{ width: "100%" }}>
        <Grid item container md={6} xs={8} lg={6} sm={6}>
          <Box ml={1} mt={2} style={{ marginRight: "auto" }}>
            <Card style={{ minWidth: "150px", backgroundColor: "#5C6BC0" }}>
              <CardContent>
                <Typography variant="caption">Mike</Typography>
                <span style={{ float: "right" }}>
                  <Typography variant="caption">9:22 pm</Typography>
                </span>
                <Box mt={1} mb={-1}>
                  <Typography variant="body2">
                    What happens when I enter a super long message? Like for
                    example, say I want to tell a story. The story goes like
                    this: A man comes across a ring, no ordinary ring that which
                    he is oblivious about. A ring to rule the entire world! But
                    instead of wearing the said ring and conquering the whole
                    world, the madlad pisses on it! Hello Everyone!
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Box>

      <AppBar position="fixed" className={classes.appBar}>
        <Box
          display="flex"
          direction="row"
          alignItems="flex-end"
          style={{ marginTop: "auto" }}
        >
          <Grid container>
            <Box display="flex" py={2} px={1} style={{ width: "100%" }}>
              <TextField
                variant="outlined"
                placeholder="Type a message"
                fullWidth
              />
              <IconButton>
                <SvgIcon>
                  <ArrowRightIcon />
                </SvgIcon>
              </IconButton>
            </Box>
          </Grid>
        </Box>
      </AppBar>
    </>
  );
};

export default Chats;
