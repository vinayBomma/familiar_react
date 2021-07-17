import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";

const Chats = () => {
  return (
    <>
      <Box display="flex" flexDirection="row-reverse" style={{ width: "100%" }}>
        <Grid item container md={6} xs={8} lg={6} sm={6}>
          <Box mr={1} mt={2} style={{ marginLeft: "auto" }}>
            <Card style={{ minWidth: "150px", backgroundColor: "#00796B" }}>
              <CardContent>
                <Typography variant="caption">You</Typography>
                <span style={{ float: "right" }}>
                  <Typography variant="caption">9:22 pm</Typography>
                </span>
                <Box mt={1} mb={-1}>
                  <Typography variant="body2">
                    {/* What happens when I enter a super long message? Like for
                      example, say I want to tell a story. The story goes like
                      this: A man comes across a ring, no ordinary ring that
                      which he is oblivious about. A ring to rule the entire
                      world! But instead of wearing the said ring and conquering
                      the whole world, the madlad pisses on it! */}
                    Hello Everyone!
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
            <Card style={{ minWidth: "150px", backgroundColor: "#3949AB" }}>
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

      <Box
        display="flex"
        direction="row"
        alignItems="flex-end"
        style={{ width: "100%", backgroundColor: "green" }}
      >
        <Grid container alignItems="flex-end">
          <Box>
            <TextField
              label="Send a message"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default Chats;
