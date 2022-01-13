import React from "react";
import { Box, Badge } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import { ReadMessages } from "../../store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
  badge: {
    marginRight: theme.spacing(2),
    padding: theme.spacing(1),
  },
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation } = props;
  const { otherUser, unreadMessages } = conversation;
  
  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
    await props.setAsReadMessage({
      conversationId: conversation.id,
      recipientId: otherUser.id,
    });
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent
        conversation={conversation}
        unreadMessages={unreadMessages}
      />
      {unreadMessages !== 0 && (
        <Badge
          className={classes.badge}
          color="primary"
          badgeContent={unreadMessages}
          max={99}
        ></Badge>
      ) }
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    setAsReadMessage:(conversationId)=>{dispatch(ReadMessages(conversationId));}
  };
};

export default connect(null, mapDispatchToProps)(Chat);
