import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Avatar } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  avatar: {
    height: 20,
    width: 20,
    marginRight: 11,
    marginTop: 6,
  },
}));

const IsReadBubble = (props) => {
  const classes = useStyles();
  const {   otherUser } = props;
  return (
    <Box className={classes.root}>
      <Avatar
        alt={otherUser.username}
        src={otherUser.photoUrl}
        className={classes.avatar}
      ></Avatar>
     
    </Box>
  );
};

export default IsReadBubble;
