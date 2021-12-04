import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import IsReadBubble from "./IsReadBubble";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  const firstReadMessage = [...messages]
    .reverse()
    .find((i) => i.senderId === userId && i.isRead === true);

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <Box key={message.id}>
            <SenderBubble text={message.text} time={time} />
            {firstReadMessage.id === message.id ? (
              <IsReadBubble otherUser={otherUser} />
            ) : null}
          </Box>
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
