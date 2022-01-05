export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  const newState = [...state];

  return newState
    .map((convo) => {

      
      if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
        convoCopy.unreadMessages =
          message.isRead === true ? 0 : convoCopy.unreadMessages +1;
    
      convoCopy.firstReadMessage =
        message.senderId !== convoCopy.otherUser.id && message.isRead === true
          ? message.id
          : convoCopy.firstReadMessage;


        convoCopy.messages = [message, ...convoCopy.messages];
        convoCopy.latestMessageText = message.text;
        return convoCopy;
      } else {
        return convo;
      }
    })
    .sort((a, b) =>
      a.id === message.conversationId
        ? -1
        : b.id === message.conversationId
        ? 1
        : 0
    );
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  const newState = [...state];

  return newState
    .map((convo) => {
      if (convo.otherUser.id === recipientId) {
        const convoCopy = { ...convo };
        convoCopy.id = message.conversationId;
        convoCopy.messages.push(message);
        convoCopy.latestMessageText = message.text;
        return convoCopy;
      } else {
        return convo;
      }
    })
    .sort((a, b) =>
      a.otherUser.id === recipientId
        ? -1
        : b.otherUser.id === recipientId
        ? 1
        : 0
    );
};
export const setIsReadMessages = (state, payload) => {
  const { sender, conversationId } = payload;

  const newState = [...state];
  return newState.map((convo) => {
    if (convo.id === conversationId) {
      const convoCopy = { ...convo };
      convoCopy.unreadMessages = 0;
      const firstReadMessage = convoCopy.messages.find(
        (i) => i.senderId !== convoCopy.otherUser.id && i.isRead === true
      )?.id;
      convoCopy.firstReadMessage =
        firstReadMessage === null ? -1 : firstReadMessage;
      convoCopy.messages = [...convoCopy.messages].map((message) => {
        if (message.isRead === false && message.senderId !== sender) {
          const newMessage = { ...message };
          newMessage.isRead = true;
          return newMessage;
        } else {
          return message;
        }
      });

      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addConversations = (conversations) => {
  return conversations.map((convo) => {
    const convoCopy = { ...convo };

    const firstReadMessage = convoCopy.messages.find(
      (i) => i.senderId !== convoCopy.otherUser.id && i.isRead === true
    )?.id;
    convoCopy.firstReadMessage =
      firstReadMessage === null ? -1 : firstReadMessage;
    const unreadMessages = convoCopy.messages.reduce(
      (accumulateur, valeurCourante) =>
        accumulateur +
        (valeurCourante.isRead === false &&
        valeurCourante.senderId === convoCopy.otherUser.id
          ? 1
          : 0),
      0
    );
    convoCopy.unreadMessages = unreadMessages;

    return convoCopy;
  });
};
