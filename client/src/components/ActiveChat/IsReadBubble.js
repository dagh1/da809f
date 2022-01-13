import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Avatar } from "@material-ui/core";
import { theme } from './../../themes/theme';

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  avatar: {
    height: 20,
    width: 20,
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(0.5),
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
      />
     
    </Box>
  );
};

export default IsReadBubble;
