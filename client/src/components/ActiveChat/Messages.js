import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import IsReadBubble from "./IsReadBubble";

const Messages = (props) => {
  const { messages, otherUser, userId, firstReadMessage } = props;
  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <Box key={message.id}>
            <SenderBubble text={message.text} time={time} />
            {firstReadMessage=== message.id && (
              <IsReadBubble otherUser={otherUser} />
            ) }
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
