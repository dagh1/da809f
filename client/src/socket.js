import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  setAsReadMessage,
} from "./store/conversations";
import { updateMessages } from "./store/utils/thunkCreators";



const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });

  socket.on("read-messages", (data) => {
    store.dispatch(setAsReadMessage(data.conversationId, data.sender));
  });

  socket.on("new-message", async (data) => {
 
      // test id the message is arrived from active conversation,if so then dispatch read message
    const activeConvo = [...store.getState().conversations].filter(
        (convo) => convo.id === data.message.conversationId
      );

      if (
        activeConvo.length !== 0 &&
        activeConvo[0].otherUser.username ===
          store.getState().activeConversation
      )
      {
       data.message.isRead= true
        await updateMessages({
          conversationId: activeConvo[0].id,
          sender: data.sender,
        });
          socket.emit("read-messages", {
            conversationId: activeConvo[0].id,
            sender: data.sender,
          });
    }
       store.dispatch(setNewMessage(data.message, data.sender));
    }
     );
    
 
   
    

   
  });


export default socket;
